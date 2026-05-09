import { seedPrograms } from "./seed-data";

export interface AssessmentAnswers {
  interests: Record<string, boolean>; // selected categories
  skills: Record<string, number>; // 1-5 scale
  workStyle: string[];
  constraints: {
    location: string;
    budget: string;
    language: string;
  };
  careerGoals: string[];
}

export function matchPrograms(answers: AssessmentAnswers) {
  const recommendations = seedPrograms.map(program => {
    let score = 0;
    let maxPossibleScore = 0;
    const reasons: string[] = [];
    const concerns: string[] = [];
    const skillsToDevelop: string[] = [];

    // --- 1. Interests & Subjects Matching (Weight: High) ---
    const activeInterests = Object.keys(answers.interests || {}).filter(k => answers.interests[k]);
    let interestMatches = 0;
    
    // Create a normalized list of tags
    const programTags = program.interest_tags || [];
    
    activeInterests.forEach(interest => {
      const lowerInterest = interest.toLowerCase();
      // Check if user interest maps to any program tags
      if (programTags.some(tag => lowerInterest.includes(tag) || tag.includes(lowerInterest) || 
          (lowerInterest.includes('health') && tag.includes('biology')) ||
          (lowerInterest.includes('technology') && tag.includes('computer')))) {
        interestMatches++;
      }
    });

    const interestScore = (interestMatches / Math.max(activeInterests.length, 1)) * 30; // Max 30 points
    maxPossibleScore += 30;
    score += interestScore;

    if (interestScore > 15) {
      reasons.push("Strong alignment with your core interests.");
    } else if (interestScore < 5) {
      concerns.push("Does not closely match your primary interests.");
    }

    // --- 2. Skills Match (Weight: Medium) ---
    let skillScore = 0;
    const programSkills = program.skills_needed || [];
    programSkills.forEach(skill => {
      // Find matching user skill (fuzzy match)
      const userSkillScore = Object.keys(answers.skills || {}).find(k => k.toLowerCase().includes(skill.toLowerCase())) 
        ? answers.skills[Object.keys(answers.skills).find(k => k.toLowerCase().includes(skill.toLowerCase())) as string] 
        : 3; // Default 3 if not explicitly rated

      if (userSkillScore >= 4) {
        skillScore += 5; // Good match
      } else if (userSkillScore <= 2) {
        skillsToDevelop.push(skill);
      } else {
        skillScore += 2;
      }
    });
    
    const maxSkillScore = Math.max(programSkills.length * 5, 1);
    const normalizedSkillScore = (skillScore / maxSkillScore) * 20; // Max 20 points
    maxPossibleScore += 20;
    score += normalizedSkillScore;

    if (normalizedSkillScore > 15) {
      reasons.push("Your strongest skills map perfectly to this field.");
    }

    // --- 3. Work Style & Career Goals Match (Weight: Medium) ---
    let styleScore = 0;
    const styleString = answers.workStyle?.join(" ").toLowerCase() || "";
    const goalsString = answers.careerGoals?.join(" ").toLowerCase() || "";
    
    // Check if program is practical vs theoretical
    if (program.best_for?.some(b => b.toLowerCase().includes('practical')) && styleString.includes('practical')) {
      styleScore += 10;
    }
    // Check if program is research/science
    if (program.best_for?.some(b => b.toLowerCase().includes('research')) && styleString.includes('theory')) {
      styleScore += 10;
    }
    // Check if program is people-oriented
    if (program.best_for?.some(b => b.toLowerCase().includes('people')) && styleString.includes('people')) {
      styleScore += 10;
    }
    // Check stability vs fast-growing
    if (program.best_for?.some(b => b.toLowerCase().includes('stable')) && goalsString.includes('stability')) {
      styleScore += 10;
    }
    if (program.best_for?.some(b => b.toLowerCase().includes('fast-growing')) && (goalsString.includes('future') || goalsString.includes('high salary'))) {
      styleScore += 10;
    }

    const normalizedStyleScore = Math.min((styleScore / 20) * 20, 20); // Cap at 20 points
    maxPossibleScore += 20;
    score += normalizedStyleScore;

    if (normalizedStyleScore > 10) {
      reasons.push("Matches your preferred work environment and goals.");
    }

    // --- 4. Constraints Match (Budget, Location) (Weight: High) ---
    const budgetLevels = ["Low", "Medium", "Medium-High", "High", "Very High"];
    const userBudgetIdx = budgetLevels.indexOf(answers.constraints?.budget || "Medium-High");
    const progBudgetIdx = budgetLevels.indexOf(program.budget_tier || "High");

    let budgetScore = 0;
    if (progBudgetIdx <= userBudgetIdx) {
      budgetScore = 20; // Within budget
      reasons.push("Fits within your financial plan.");
    } else if (progBudgetIdx === userBudgetIdx + 1) {
      budgetScore = 10; // Slightly over budget
      concerns.push("Slightly above your stated budget tier.");
    } else {
      budgetScore = 0; // Way over budget
      concerns.push("May significantly exceed your budget constraints.");
    }
    
    maxPossibleScore += 20;
    score += budgetScore;

    // Location scoring
    const userLoc = answers.constraints?.location?.toLowerCase() || "";
    const progLoc = program.location?.toLowerCase() || "";
    let locScore = 10;
    
    if (userLoc !== "any location in egypt" && userLoc !== "abroad later") {
      if (userLoc.includes("cairo") && (progLoc.includes("cairo") || progLoc.includes("capital") || progLoc.includes("badr") || progLoc.includes("sherouk"))) {
        locScore = 10;
      } else if (userLoc.includes("giza") && (progLoc.includes("giza") || progLoc.includes("october") || progLoc.includes("zayed"))) {
        locScore = 10;
      } else if (progLoc !== "cairo" && progLoc !== "giza" && !userLoc.includes(progLoc)) {
        locScore = 0;
        concerns.push("Location is outside your preferred area.");
      }
    }
    
    maxPossibleScore += 10;
    score += locScore;

    // --- Final Calculation ---
    // Ensure final score is a percentage 0-100
    const finalScore = Math.round((score / maxPossibleScore) * 100);

    return {
      programId: program.id,
      matchScore: finalScore,
      reasons,
      concerns,
      skillsToDevelop
    };
  });

  // Sort by highest match score
  return recommendations.sort((a, b) => b.matchScore - a.matchScore);
}
