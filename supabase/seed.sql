-- Insert Universities
INSERT INTO public.universities (id, name, short_name, location, city, type) VALUES
('11111111-1111-1111-1111-111111111111', 'German University in Cairo', 'GUC', 'New Cairo', 'Cairo', 'Private'),
('22222222-2222-2222-2222-222222222222', 'British University in Egypt', 'BUE', 'El Sherouk', 'Cairo', 'Private'),
('33333333-3333-3333-3333-333333333333', 'Nile University', 'NU', 'Sheikh Zayed / 6 October', 'Giza', 'Ahliya/Non-profit'),
('44444444-4444-4444-4444-444444444444', 'American University in Cairo', 'AUC', 'New Cairo', 'Cairo', 'Private'),
('55555555-5555-5555-5555-555555555555', 'Misr International University', 'MIU', 'Cairo', 'Cairo', 'Private'),
('66666666-6666-6666-6666-666666666666', 'October University for Modern Sciences and Arts', 'MSA', '6 October', 'Giza', 'Private'),
('77777777-7777-7777-7777-777777777777', 'Canadian International College', 'CIC', 'New Cairo / Sheikh Zayed', 'Cairo', 'Private'),
('88888888-8888-8888-8888-888888888888', 'Egyptian Informatics University', 'EIU', 'New Administrative Capital', 'Cairo', 'Ahliya');

-- Insert Programs
INSERT INTO public.programs (id, university_id, program_name, faculty, field_category, duration, language, location, budget_tier, approximate_fee_note, requirements_summary, career_outcomes, skills_needed, best_for, source_note, verification_status) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Business Informatics', 'Management Technology', 'Business Technology', '4 years / 8 semesters', 'English', 'New Cairo', 'High', 'Tuition varies by high school grade tier', 'High school diploma, English proficiency', '["Business Analyst", "ERP Consultant", "Data Analyst", "Product Analyst"]', '["Business analysis", "Databases", "Statistics"]', '["Practical work", "Structured tasks"]', 'Based on general information', 'seed_verified_program_exists'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 'Computer Science', 'Information Technology and Computer Science', 'Computer Science', '4 years', 'English', 'Sheikh Zayed / 6 October', 'Medium-High', 'Varies by entry scholarship', 'High school math/science track', '["Software Engineer", "Backend Developer", "Data Engineer"]', '["Problem solving", "Mathematics", "Technology usage"]', '["Practical work", "Solving complex problems"]', 'Based on general information', 'seed_verified_program_exists');
-- Add the rest as needed or use the admin seed UI.
