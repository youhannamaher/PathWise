export const seedUniversities = [
  { id: "u1", name: "Cairo University", short_name: "CU", location: "Giza", city: "Giza", type: "Public" },
  { id: "u2", name: "Ain Shams University", short_name: "ASU", location: "Abbassia", city: "Cairo", type: "Public" },
  { id: "u3", name: "Alexandria University", short_name: "AU", location: "Alexandria", city: "Alexandria", type: "Public" },
  { id: "u4", name: "The American University in Cairo", short_name: "AUC", location: "New Cairo", city: "Cairo", type: "Private" },
  { id: "u5", name: "The German University in Cairo", short_name: "GUC", location: "New Cairo", city: "Cairo", type: "Private" },
  { id: "u6", name: "The British University in Egypt", short_name: "BUE", location: "El Sherouk", city: "Cairo", type: "Private" },
  { id: "u7", name: "Nile University", short_name: "NU", location: "Sheikh Zayed", city: "Giza", type: "Ahliya" },
  { id: "u8", name: "Misr International University", short_name: "MIU", location: "Cairo", city: "Cairo", type: "Private" },
  { id: "u9", name: "MSA University", short_name: "MSA", location: "6 October", city: "Giza", type: "Private" },
  { id: "u10", name: "Future University in Egypt", short_name: "FUE", location: "New Cairo", city: "Cairo", type: "Private" },
  { id: "u11", name: "Egypt University of Informatics", short_name: "EUI", location: "New Capital", city: "Cairo", type: "Ahliya" },
  { id: "u12", name: "Galala University", short_name: "GU", location: "Galala City", city: "Suez", type: "Ahliya" },
  { id: "u13", name: "Newgiza University", short_name: "NGU", location: "New Giza", city: "Giza", type: "Private" },
  { id: "u14", name: "Coventry University Egypt", short_name: "TKH", location: "New Capital", city: "Cairo", type: "International" },
  { id: "u15", name: "Zewail City of Science and Technology", short_name: "ZC", location: "6 October", city: "Giza", type: "Non-profit" },
  { id: "u16", name: "Badr University in Cairo", short_name: "BUC", location: "Badr City", city: "Cairo", type: "Private" }
];

export const seedPrograms = [
  // MEDICINE AND HEALTHCARE
  {
    id: "p1", university_id: "u1", program_name: "Medicine and Surgery (MBBCh)", faculty: "Kasr Al Ainy",
    field_category: "Medicine", academic_cluster: "Healthcare", duration: "5 years + 2 training", language: "English",
    location: "Giza", budget_tier: "Low", approximate_fee_note: "Public university fees",
    requirements_summary: "Top percentile in Thanaweya Amma (Science section)",
    career_outcomes: ["Physician", "Surgeon", "Medical Researcher"],
    skills_needed: ["Problem solving", "Analytical thinking", "Communication", "Working under pressure"],
    best_for: ["Helping people", "Science & research", "Stable careers", "Biology"],
    interest_tags: ["biology", "helping & caring for people", "science & research", "understanding human behavior"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p2", university_id: "u13", program_name: "Medicine", faculty: "School of Medicine",
    field_category: "Medicine", academic_cluster: "Healthcare", duration: "5 years + 2 training", language: "English",
    location: "New Giza", budget_tier: "Very High", approximate_fee_note: "Very High tier private fees",
    requirements_summary: "High school diploma, Science track, admission test",
    career_outcomes: ["Doctor", "Healthcare Consultant"],
    skills_needed: ["Problem solving", "Teamwork", "Communication"],
    best_for: ["Helping people", "Stable careers"],
    interest_tags: ["biology", "helping & caring for people", "science & research"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p3", university_id: "u6", program_name: "Dentistry", faculty: "Faculty of Dentistry",
    field_category: "Dentistry", academic_cluster: "Healthcare", duration: "5 years + 1 training", language: "English",
    location: "El Sherouk", budget_tier: "High", approximate_fee_note: "High tier private fees",
    requirements_summary: "High school diploma, Science track",
    career_outcomes: ["Dentist", "Orthodontist", "Dental Surgeon"],
    skills_needed: ["Problem solving", "Precision", "Communication"],
    best_for: ["Helping people", "Practical work", "Biology"],
    interest_tags: ["biology", "helping & caring for people", "building & fixing things"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p4", university_id: "u5", program_name: "Pharmacy and Biotechnology", faculty: "Faculty of Pharmacy",
    field_category: "Pharmacy", academic_cluster: "Healthcare", duration: "5 years", language: "English",
    location: "New Cairo", budget_tier: "High", approximate_fee_note: "High tier private fees",
    requirements_summary: "High school diploma, Science/Math track",
    career_outcomes: ["Pharmacist", "Biotechnologist", "Research Scientist"],
    skills_needed: ["Analytical thinking", "Problem solving", "Organization"],
    best_for: ["Science & research", "Stable careers", "Chemistry"],
    interest_tags: ["biology", "chemistry", "science & research", "helping & caring for people"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p5", university_id: "u9", program_name: "Physical Therapy", faculty: "Physical Therapy",
    field_category: "Physical Therapy", academic_cluster: "Healthcare", duration: "5 years + 1 training", language: "English",
    location: "6 October", budget_tier: "High", approximate_fee_note: "High tier private fees",
    requirements_summary: "High school diploma, Science track",
    career_outcomes: ["Physical Therapist", "Rehabilitation Specialist"],
    skills_needed: ["Communication", "Problem solving", "Patience"],
    best_for: ["Helping people", "Practical work"],
    interest_tags: ["biology", "helping & caring for people", "understanding human behavior"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p6", university_id: "u12", program_name: "Nursing", faculty: "Nursing",
    field_category: "Nursing", academic_cluster: "Healthcare", duration: "4 years", language: "English",
    location: "Galala City", budget_tier: "Medium", approximate_fee_note: "Ahliya tier fees",
    requirements_summary: "High school diploma, Science track",
    career_outcomes: ["Registered Nurse", "Clinical Care Manager"],
    skills_needed: ["Communication", "Teamwork", "Working under pressure"],
    best_for: ["Helping people", "Practical work"],
    interest_tags: ["biology", "helping & caring for people"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p7", university_id: "u16", program_name: "Veterinary Medicine", faculty: "Veterinary Medicine",
    field_category: "Veterinary", academic_cluster: "Healthcare", duration: "5 years", language: "English",
    location: "Badr City", budget_tier: "Medium-High", approximate_fee_note: "Private tier fees",
    requirements_summary: "High school diploma, Science track",
    career_outcomes: ["Veterinarian", "Animal Researcher"],
    skills_needed: ["Problem solving", "Analytical thinking", "Patience"],
    best_for: ["Helping & caring for people", "Science & research", "Biology"],
    interest_tags: ["biology", "helping & caring for people", "science & research"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  
  // ENGINEERING
  {
    id: "p8", university_id: "u15", program_name: "Nanotechnology Engineering", faculty: "Engineering",
    field_category: "Engineering", academic_cluster: "Engineering", duration: "4-5 years", language: "English",
    location: "6 October", budget_tier: "Medium-High", approximate_fee_note: "Non-profit tier fees",
    requirements_summary: "High school Math track, strong STEM background",
    career_outcomes: ["Nanotechnology Engineer", "Materials Scientist", "R&D Engineer"],
    skills_needed: ["Mathematics", "Analytical thinking", "Problem solving"],
    best_for: ["Science & research", "Solving complex problems", "Physics"],
    interest_tags: ["physics", "chemistry", "science & research", "building & fixing things", "math"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p9", university_id: "u5", program_name: "Mechatronics Engineering", faculty: "Engineering and Material Science",
    field_category: "Engineering", academic_cluster: "Engineering", duration: "5 years", language: "English",
    location: "New Cairo", budget_tier: "High", approximate_fee_note: "Tuition varies by tier",
    requirements_summary: "High school Math track",
    career_outcomes: ["Robotics Engineer", "Automation Engineer", "Mechatronics Engineer"],
    skills_needed: ["Mathematics", "Problem solving", "Technology usage", "Creativity"],
    best_for: ["Building & fixing things", "Solving complex problems", "Practical work"],
    interest_tags: ["physics", "math", "technology & coding", "building & fixing things"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p10", university_id: "u14", program_name: "Civil Engineering", faculty: "Engineering",
    field_category: "Engineering", academic_cluster: "Engineering", duration: "4 years", language: "English",
    location: "New Capital", budget_tier: "Very High", approximate_fee_note: "International branch campus fees",
    requirements_summary: "High school Math track",
    career_outcomes: ["Civil Engineer", "Construction Manager", "Structural Engineer"],
    skills_needed: ["Mathematics", "Organization", "Problem solving"],
    best_for: ["Building & fixing things", "Practical work", "Structured tasks"],
    interest_tags: ["physics", "math", "building & fixing things"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p11", university_id: "u4", program_name: "Architectural Engineering", faculty: "Sciences and Engineering",
    field_category: "Architecture", academic_cluster: "Engineering", duration: "5 years", language: "English",
    location: "New Cairo", budget_tier: "Very High", approximate_fee_note: "Paid per credit hour",
    requirements_summary: "High school Math track, Portfolio sometimes required",
    career_outcomes: ["Architect", "Urban Planner", "Design Engineer"],
    skills_needed: ["Creativity", "Mathematics", "Problem solving", "Technology usage"],
    best_for: ["Design & creativity", "Building & fixing things", "Practical work"],
    interest_tags: ["art/design", "math", "design & creativity", "building & fixing things"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p12", university_id: "u2", program_name: "Mechanical Engineering", faculty: "Engineering",
    field_category: "Engineering", academic_cluster: "Engineering", duration: "5 years", language: "English/Arabic",
    location: "Cairo", budget_tier: "Low", approximate_fee_note: "Public university fees (Credit hour system slightly higher)",
    requirements_summary: "High school Math track",
    career_outcomes: ["Mechanical Engineer", "Automotive Engineer", "Maintenance Engineer"],
    skills_needed: ["Mathematics", "Problem solving", "Analytical thinking"],
    best_for: ["Building & fixing things", "Practical work", "Physics"],
    interest_tags: ["physics", "math", "building & fixing things"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },

  // BUSINESS AND ECONOMICS
  {
    id: "p13", university_id: "u4", program_name: "Business Administration", faculty: "School of Business",
    field_category: "Business", academic_cluster: "Business", duration: "4 years", language: "English",
    location: "New Cairo", budget_tier: "Very High", approximate_fee_note: "Paid per credit hour",
    requirements_summary: "High academic standing, advanced English",
    career_outcomes: ["Business Consultant", "Entrepreneur", "Marketing Manager", "Financial Analyst"],
    skills_needed: ["Communication", "Leadership", "Analytical thinking", "Teamwork"],
    best_for: ["Business & management", "Working with people", "Fast-growing fields"],
    interest_tags: ["business & management", "business", "finance & numbers"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p14", university_id: "u1", program_name: "Economics", faculty: "Economics and Political Science",
    field_category: "Economics", academic_cluster: "Business", duration: "4 years", language: "English/Arabic",
    location: "Giza", budget_tier: "Low", approximate_fee_note: "Public university fees (English section has moderate fees)",
    requirements_summary: "Top percentile in Thanaweya Amma",
    career_outcomes: ["Economist", "Policy Analyst", "Financial Consultant"],
    skills_needed: ["Analytical thinking", "Mathematics", "Writing"],
    best_for: ["Finance & numbers", "Science & research", "Solving complex problems"],
    interest_tags: ["finance & numbers", "math", "history/politics", "business"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p15", university_id: "u7", program_name: "Finance", faculty: "Business Administration",
    field_category: "Finance", academic_cluster: "Business", duration: "4 years", language: "English",
    location: "Sheikh Zayed", budget_tier: "Medium-High", approximate_fee_note: "Ahliya tier fees",
    requirements_summary: "High school diploma",
    career_outcomes: ["Investment Banker", "Financial Analyst", "Risk Manager"],
    skills_needed: ["Mathematics", "Analytical thinking", "Problem solving"],
    best_for: ["Finance & numbers", "Structured tasks", "Stable careers"],
    interest_tags: ["finance & numbers", "math", "business & management"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p16", university_id: "u10", program_name: "Marketing", faculty: "Commerce and Business Administration",
    field_category: "Marketing", academic_cluster: "Business", duration: "4 years", language: "English",
    location: "New Cairo", budget_tier: "High", approximate_fee_note: "Private tier fees",
    requirements_summary: "High school diploma",
    career_outcomes: ["Marketing Specialist", "Brand Manager", "Market Researcher"],
    skills_needed: ["Creativity", "Communication", "Analytical thinking"],
    best_for: ["Design & creativity", "Working with people", "Business & management"],
    interest_tags: ["business & management", "design & creativity", "understanding human behavior", "media & communication"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p17", university_id: "u8", program_name: "International Business", faculty: "Business Administration",
    field_category: "Business", academic_cluster: "Business", duration: "4 years", language: "English",
    location: "Cairo", budget_tier: "High", approximate_fee_note: "Private tier fees",
    requirements_summary: "High school diploma, English proficiency",
    career_outcomes: ["Global Business Manager", "Trade Analyst", "Supply Chain Manager"],
    skills_needed: ["Communication", "Leadership", "Organization"],
    best_for: ["Business & management", "Exploring new ideas", "Working with people"],
    interest_tags: ["business & management", "learning languages", "business"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },

  // TECHNOLOGY AND COMPUTER SCIENCE
  {
    id: "p18", university_id: "u11", program_name: "Artificial Intelligence", faculty: "Computing and Information Sciences",
    field_category: "Artificial Intelligence", academic_cluster: "Technology", duration: "4 years", language: "English",
    location: "New Capital", budget_tier: "Medium-High", approximate_fee_note: "Ahliya tier fees",
    requirements_summary: "High school Math track",
    career_outcomes: ["AI Engineer", "Machine Learning Researcher", "Data Scientist"],
    skills_needed: ["Mathematics", "Technology usage", "Problem solving"],
    best_for: ["Technology & coding", "Solving complex problems", "Fast-growing fields"],
    interest_tags: ["technology & coding", "math", "computer science", "science & research"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p19", university_id: "u6", program_name: "Cybersecurity", faculty: "Informatics and Computer Science",
    field_category: "Cybersecurity", academic_cluster: "Technology", duration: "4 years", language: "English",
    location: "El Sherouk", budget_tier: "High", approximate_fee_note: "Private tier fees",
    requirements_summary: "High school Math/Science track",
    career_outcomes: ["Cybersecurity Analyst", "Security Engineer", "Ethical Hacker"],
    skills_needed: ["Technology usage", "Problem solving", "Analytical thinking"],
    best_for: ["Technology & coding", "Solving complex problems", "Structured tasks"],
    interest_tags: ["technology & coding", "computer science", "building & fixing things"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p20", university_id: "u3", program_name: "Software Engineering", faculty: "Computer and Data Science",
    field_category: "Software Engineering", academic_cluster: "Technology", duration: "4 years", language: "English",
    location: "Alexandria", budget_tier: "Low", approximate_fee_note: "Public university fees (special program fees may apply)",
    requirements_summary: "High school Math track",
    career_outcomes: ["Software Engineer", "Full-Stack Developer", "Systems Architect"],
    skills_needed: ["Technology usage", "Problem solving", "Teamwork"],
    best_for: ["Technology & coding", "Building & fixing things", "Practical work"],
    interest_tags: ["technology & coding", "computer science", "building & fixing things"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p21", university_id: "u5", program_name: "Business Informatics", faculty: "Management Technology",
    field_category: "Business Technology", academic_cluster: "Technology", duration: "4 years", language: "English",
    location: "New Cairo", budget_tier: "High", approximate_fee_note: "Private tier fees",
    requirements_summary: "High school diploma",
    career_outcomes: ["Business Analyst", "Product Manager", "Data Analyst"],
    skills_needed: ["Analytical thinking", "Technology usage", "Communication"],
    best_for: ["Business & management", "Technology & coding", "Structured tasks"],
    interest_tags: ["technology & coding", "business & management", "business", "computer science"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },

  // ARTS, MEDIA, AND COMMUNICATION
  {
    id: "p22", university_id: "u4", program_name: "Mass Communication", faculty: "Global Affairs and Public Policy",
    field_category: "Media", academic_cluster: "Arts", duration: "4 years", language: "English",
    location: "New Cairo", budget_tier: "Very High", approximate_fee_note: "Paid per credit hour",
    requirements_summary: "High school diploma, strong English/Writing skills",
    career_outcomes: ["Journalist", "PR Specialist", "Media Producer"],
    skills_needed: ["Communication", "Writing", "Creativity"],
    best_for: ["Media & communication", "Working with people", "Exploring new ideas"],
    interest_tags: ["media & communication", "languages", "design & creativity", "history/politics"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p23", university_id: "u9", program_name: "Media Production", faculty: "Mass Communication",
    field_category: "Media", academic_cluster: "Arts", duration: "4 years", language: "English",
    location: "6 October", budget_tier: "Medium-High", approximate_fee_note: "Private tier fees",
    requirements_summary: "High school diploma",
    career_outcomes: ["Filmmaker", "Video Editor", "Content Creator"],
    skills_needed: ["Creativity", "Technology usage", "Teamwork"],
    best_for: ["Design & creativity", "Media & communication", "Practical work"],
    interest_tags: ["media & communication", "design & creativity", "art/design"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p24", university_id: "u5", program_name: "Graphic Design", faculty: "Applied Sciences and Arts",
    field_category: "Design", academic_cluster: "Arts", duration: "5 years", language: "English",
    location: "New Cairo", budget_tier: "High", approximate_fee_note: "Private tier fees",
    requirements_summary: "High school diploma, Portfolio/Aptitude test",
    career_outcomes: ["Graphic Designer", "Art Director", "Brand Identity Designer"],
    skills_needed: ["Creativity", "Technology usage", "Problem solving"],
    best_for: ["Design & creativity", "Practical work"],
    interest_tags: ["design & creativity", "art/design", "media & communication"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p25", university_id: "u11", program_name: "Digital Media and UX/UI Design", faculty: "Digital Arts and Design",
    field_category: "Design", academic_cluster: "Arts", duration: "4 years", language: "English",
    location: "New Capital", budget_tier: "Medium-High", approximate_fee_note: "Ahliya tier fees",
    requirements_summary: "High school diploma",
    career_outcomes: ["UX/UI Designer", "Product Designer", "Web Designer"],
    skills_needed: ["Creativity", "Analytical thinking", "Technology usage"],
    best_for: ["Design & creativity", "Understanding human behavior", "Technology & coding"],
    interest_tags: ["design & creativity", "technology & coding", "art/design", "psychology"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },

  // LAW, POLITICS, AND INTERNATIONAL RELATIONS
  {
    id: "p26", university_id: "u1", program_name: "Law (English Section)", faculty: "Law",
    field_category: "Law", academic_cluster: "Law", duration: "4 years", language: "English",
    location: "Giza", budget_tier: "Low", approximate_fee_note: "Public university fees (English section)",
    requirements_summary: "High school diploma with high grades in languages",
    career_outcomes: ["Lawyer", "Legal Advisor", "Judge", "Diplomat"],
    skills_needed: ["Analytical thinking", "Communication", "Writing"],
    best_for: ["Debate & justice", "Working with people", "Stable careers"],
    interest_tags: ["debate & justice", "history/politics", "languages"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p27", university_id: "u4", program_name: "Political Science", faculty: "Global Affairs and Public Policy",
    field_category: "Politics", academic_cluster: "Law", duration: "4 years", language: "English",
    location: "New Cairo", budget_tier: "Very High", approximate_fee_note: "Paid per credit hour",
    requirements_summary: "High academic standing",
    career_outcomes: ["Political Analyst", "Diplomat", "Policy Advisor"],
    skills_needed: ["Analytical thinking", "Writing", "Communication"],
    best_for: ["Debate & justice", "Science & research", "Exploring new ideas"],
    interest_tags: ["history/politics", "debate & justice", "understanding human behavior"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p28", university_id: "u6", program_name: "Political Science", faculty: "Business Administration, Economics and Political Science",
    field_category: "International Relations", academic_cluster: "Law", duration: "4 years", language: "English",
    location: "El Sherouk", budget_tier: "High", approximate_fee_note: "Private tier fees",
    requirements_summary: "High school diploma",
    career_outcomes: ["International Relations Specialist", "NGO Worker", "Political Consultant"],
    skills_needed: ["Communication", "Writing", "Analytical thinking"],
    best_for: ["Debate & justice", "Working with people", "Exploring new ideas"],
    interest_tags: ["history/politics", "debate & justice", "languages"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },

  // EDUCATION AND PSYCHOLOGY
  {
    id: "p29", university_id: "u4", program_name: "Psychology", faculty: "Humanities and Social Sciences",
    field_category: "Psychology", academic_cluster: "Education", duration: "4 years", language: "English",
    location: "New Cairo", budget_tier: "Very High", approximate_fee_note: "Paid per credit hour",
    requirements_summary: "High academic standing",
    career_outcomes: ["Psychologist", "Counselor", "HR Specialist"],
    skills_needed: ["Communication", "Analytical thinking", "Problem solving"],
    best_for: ["Understanding human behavior", "Helping & caring for people"],
    interest_tags: ["psychology", "understanding human behavior", "helping & caring for people", "science & research"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p30", university_id: "u2", program_name: "Education", faculty: "Education",
    field_category: "Education", academic_cluster: "Education", duration: "4 years", language: "Arabic/English",
    location: "Cairo", budget_tier: "Low", approximate_fee_note: "Public university fees",
    requirements_summary: "High school diploma",
    career_outcomes: ["Teacher", "Educational Administrator", "Curriculum Developer"],
    skills_needed: ["Communication", "Leadership", "Organization"],
    best_for: ["Teaching & guiding", "Helping & caring for people", "Stable careers"],
    interest_tags: ["teaching & guiding", "helping & caring for people", "languages"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p31", university_id: "u6", program_name: "Psychology", faculty: "Arts and Humanities",
    field_category: "Psychology", academic_cluster: "Education", duration: "4 years", language: "English",
    location: "El Sherouk", budget_tier: "High", approximate_fee_note: "Private tier fees",
    requirements_summary: "High school diploma",
    career_outcomes: ["Counselor", "Behavioral Therapist", "Researcher"],
    skills_needed: ["Communication", "Analytical thinking", "Writing"],
    best_for: ["Understanding human behavior", "Helping & caring for people"],
    interest_tags: ["psychology", "understanding human behavior", "helping & caring for people"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },

  // SCIENCE AND RESEARCH
  {
    id: "p32", university_id: "u15", program_name: "Biomedical Sciences", faculty: "Science",
    field_category: "Science", academic_cluster: "Science", duration: "4 years", language: "English",
    location: "6 October", budget_tier: "Medium-High", approximate_fee_note: "Non-profit tier fees",
    requirements_summary: "High school Science track",
    career_outcomes: ["Biomedical Researcher", "Lab Technician", "Biotechnologist"],
    skills_needed: ["Analytical thinking", "Problem solving", "Technology usage"],
    best_for: ["Science & research", "Exploring new ideas"],
    interest_tags: ["biology", "chemistry", "science & research"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p33", university_id: "u1", program_name: "Physics", faculty: "Science",
    field_category: "Science", academic_cluster: "Science", duration: "4 years", language: "English/Arabic",
    location: "Giza", budget_tier: "Low", approximate_fee_note: "Public university fees",
    requirements_summary: "High school Science/Math track",
    career_outcomes: ["Physicist", "Research Scientist", "Data Analyst"],
    skills_needed: ["Mathematics", "Analytical thinking", "Problem solving"],
    best_for: ["Science & research", "Solving complex problems"],
    interest_tags: ["physics", "math", "science & research"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p34", university_id: "u3", program_name: "Environmental Science", faculty: "Science",
    field_category: "Science", academic_cluster: "Science", duration: "4 years", language: "English/Arabic",
    location: "Alexandria", budget_tier: "Low", approximate_fee_note: "Public university fees",
    requirements_summary: "High school Science track",
    career_outcomes: ["Environmental Scientist", "Sustainability Consultant"],
    skills_needed: ["Analytical thinking", "Problem solving", "Communication"],
    best_for: ["Science & research", "Exploring new ideas"],
    interest_tags: ["biology", "chemistry", "science & research"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },

  // HOSPITALITY, TOURISM, AND LANGUAGES
  {
    id: "p35", university_id: "u16", program_name: "Languages and Translation", faculty: "Linguistics and Translation",
    field_category: "Languages", academic_cluster: "Hospitality", duration: "4 years", language: "Multi-lingual",
    location: "Badr City", budget_tier: "Medium", approximate_fee_note: "Private tier fees",
    requirements_summary: "High school diploma",
    career_outcomes: ["Translator", "Interpreter", "Localization Specialist"],
    skills_needed: ["Writing", "Communication", "Analytical thinking"],
    best_for: ["Learning languages", "Media & communication", "Working with people"],
    interest_tags: ["languages", "learning languages", "media & communication"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p36", university_id: "u12", program_name: "Tourism and Hospitality Management", faculty: "Tourism and Hospitality",
    field_category: "Hospitality", academic_cluster: "Hospitality", duration: "4 years", language: "English",
    location: "Galala City", budget_tier: "Medium", approximate_fee_note: "Ahliya tier fees",
    requirements_summary: "High school diploma",
    career_outcomes: ["Hotel Manager", "Tourism Consultant", "Event Planner"],
    skills_needed: ["Communication", "Leadership", "Organization", "Teamwork"],
    best_for: ["Working with people", "Business & management", "Practical work"],
    interest_tags: ["business & management", "helping & caring for people", "languages"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p37", university_id: "u1", program_name: "Tourism and Hotels", faculty: "Tourism and Hotels",
    field_category: "Hospitality", academic_cluster: "Hospitality", duration: "4 years", language: "Arabic/English",
    location: "Giza", budget_tier: "Low", approximate_fee_note: "Public university fees",
    requirements_summary: "High school diploma",
    career_outcomes: ["Tour Guide", "Hospitality Manager"],
    skills_needed: ["Communication", "Teamwork", "Organization"],
    best_for: ["Working with people", "Practical work"],
    interest_tags: ["history/politics", "languages", "helping & caring for people"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  
  // ADDITIONAL PROGRAMS TO EXPAND DATABASE
  {
    id: "p38", university_id: "u2", program_name: "Computer Science", faculty: "Computer and Information Sciences",
    field_category: "Computer Science", academic_cluster: "Technology", duration: "4 years", language: "English/Arabic",
    location: "Abbassia", budget_tier: "Low", approximate_fee_note: "Public university fees",
    requirements_summary: "High school Math track",
    career_outcomes: ["Software Engineer", "Systems Analyst"],
    skills_needed: ["Mathematics", "Technology usage", "Problem solving"],
    best_for: ["Technology & coding", "Solving complex problems"],
    interest_tags: ["technology & coding", "computer science", "math"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p39", university_id: "u8", program_name: "Pharmacy", faculty: "Pharmacy",
    field_category: "Pharmacy", academic_cluster: "Healthcare", duration: "5 years", language: "English",
    location: "Cairo", budget_tier: "High", approximate_fee_note: "Private tier fees",
    requirements_summary: "High school Science/Math track",
    career_outcomes: ["Pharmacist", "Clinical Researcher"],
    skills_needed: ["Analytical thinking", "Organization"],
    best_for: ["Science & research", "Helping & caring for people"],
    interest_tags: ["biology", "chemistry", "science & research", "helping & caring for people"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p40", university_id: "u10", program_name: "Dentistry", faculty: "Oral and Dental Medicine",
    field_category: "Dentistry", academic_cluster: "Healthcare", duration: "5 years + 1 training", language: "English",
    location: "New Cairo", budget_tier: "High", approximate_fee_note: "Private tier fees",
    requirements_summary: "High school Science track",
    career_outcomes: ["Dentist", "Dental Surgeon"],
    skills_needed: ["Problem solving", "Precision"],
    best_for: ["Practical work", "Helping & caring for people"],
    interest_tags: ["biology", "helping & caring for people"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p41", university_id: "u7", program_name: "Industrial Engineering", faculty: "Engineering and Applied Sciences",
    field_category: "Engineering", academic_cluster: "Engineering", duration: "5 years", language: "English",
    location: "Sheikh Zayed", budget_tier: "Medium-High", approximate_fee_note: "Ahliya tier fees",
    requirements_summary: "High school Math track",
    career_outcomes: ["Industrial Engineer", "Operations Manager"],
    skills_needed: ["Mathematics", "Organization", "Problem solving"],
    best_for: ["Building & fixing things", "Structured tasks"],
    interest_tags: ["physics", "math", "business & management"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p42", university_id: "u3", program_name: "Medicine", faculty: "Medicine",
    field_category: "Medicine", academic_cluster: "Healthcare", duration: "5 years + 2 training", language: "English",
    location: "Alexandria", budget_tier: "Low", approximate_fee_note: "Public university fees",
    requirements_summary: "Top percentile in Thanaweya Amma",
    career_outcomes: ["Physician", "Medical Researcher"],
    skills_needed: ["Problem solving", "Working under pressure"],
    best_for: ["Helping & caring for people", "Science & research"],
    interest_tags: ["biology", "helping & caring for people"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p43", university_id: "u13", program_name: "Business and Finance", faculty: "Business and Finance",
    field_category: "Business", academic_cluster: "Business", duration: "4 years", language: "English",
    location: "New Giza", budget_tier: "Very High", approximate_fee_note: "Private tier fees",
    requirements_summary: "High school diploma",
    career_outcomes: ["Financial Analyst", "Business Manager"],
    skills_needed: ["Analytical thinking", "Communication"],
    best_for: ["Business & management", "Finance & numbers"],
    interest_tags: ["business & management", "finance & numbers", "business"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p44", university_id: "u14", program_name: "Accounting and Finance", faculty: "Business",
    field_category: "Finance", academic_cluster: "Business", duration: "3-4 years", language: "English",
    location: "New Capital", budget_tier: "Very High", approximate_fee_note: "International branch campus fees",
    requirements_summary: "High school diploma",
    career_outcomes: ["Accountant", "Auditor"],
    skills_needed: ["Mathematics", "Analytical thinking", "Organization"],
    best_for: ["Finance & numbers", "Structured tasks"],
    interest_tags: ["finance & numbers", "math", "business"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p45", university_id: "u4", program_name: "Data Science", faculty: "Sciences and Engineering",
    field_category: "Data Science", academic_cluster: "Technology", duration: "4 years", language: "English",
    location: "New Cairo", budget_tier: "Very High", approximate_fee_note: "Paid per credit hour",
    requirements_summary: "High school Math track",
    career_outcomes: ["Data Scientist", "Data Analyst"],
    skills_needed: ["Mathematics", "Technology usage", "Analytical thinking"],
    best_for: ["Technology & coding", "Solving complex problems"],
    interest_tags: ["technology & coding", "math", "computer science", "science & research"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p46", university_id: "u9", program_name: "Dentistry", faculty: "Dentistry",
    field_category: "Dentistry", academic_cluster: "Healthcare", duration: "5 years + 1 training", language: "English",
    location: "6 October", budget_tier: "High", approximate_fee_note: "Private tier fees",
    requirements_summary: "High school Science track",
    career_outcomes: ["Dentist", "Orthodontist"],
    skills_needed: ["Problem solving", "Precision"],
    best_for: ["Practical work", "Helping & caring for people"],
    interest_tags: ["biology", "helping & caring for people"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p47", university_id: "u16", program_name: "Film and Digital Media", faculty: "Filmmaking and Performing Arts",
    field_category: "Media", academic_cluster: "Arts", duration: "4 years", language: "English",
    location: "Badr City", budget_tier: "Medium-High", approximate_fee_note: "Private tier fees",
    requirements_summary: "High school diploma, Portfolio/Aptitude test",
    career_outcomes: ["Film Director", "Digital Content Creator"],
    skills_needed: ["Creativity", "Technology usage", "Teamwork"],
    best_for: ["Design & creativity", "Media & communication"],
    interest_tags: ["media & communication", "design & creativity", "art/design"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p48", university_id: "u12", program_name: "Architecture", faculty: "Architecture",
    field_category: "Architecture", academic_cluster: "Engineering", duration: "5 years", language: "English",
    location: "Galala City", budget_tier: "Medium-High", approximate_fee_note: "Ahliya tier fees",
    requirements_summary: "High school Math track",
    career_outcomes: ["Architect", "Urban Designer"],
    skills_needed: ["Creativity", "Mathematics", "Technology usage"],
    best_for: ["Design & creativity", "Building & fixing things"],
    interest_tags: ["art/design", "math", "building & fixing things", "design & creativity"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p49", university_id: "u11", program_name: "Cybersecurity", faculty: "Computing and Information Sciences",
    field_category: "Cybersecurity", academic_cluster: "Technology", duration: "4 years", language: "English",
    location: "New Capital", budget_tier: "Medium-High", approximate_fee_note: "Ahliya tier fees",
    requirements_summary: "High school Math track",
    career_outcomes: ["Security Analyst", "Network Engineer"],
    skills_needed: ["Technology usage", "Problem solving"],
    best_for: ["Technology & coding", "Solving complex problems"],
    interest_tags: ["technology & coding", "computer science"],
    source_note: "Based on general information", verification_status: "seed_verified"
  },
  {
    id: "p50", university_id: "u1", program_name: "Mass Communication", faculty: "Mass Communication",
    field_category: "Media", academic_cluster: "Arts", duration: "4 years", language: "Arabic/English",
    location: "Giza", budget_tier: "Low", approximate_fee_note: "Public university fees",
    requirements_summary: "High school diploma",
    career_outcomes: ["Journalist", "PR Manager"],
    skills_needed: ["Communication", "Writing"],
    best_for: ["Media & communication", "Working with people"],
    interest_tags: ["media & communication", "history/politics", "languages"],
    source_note: "Based on general information", verification_status: "seed_verified"
  }
];

export const getProgramWithUniversity = (programId: string) => {
  const program = seedPrograms.find(p => p.id === programId);
  if (!program) return null;
  const university = seedUniversities.find(u => u.id === program.university_id);
  return { ...program, university };
};
