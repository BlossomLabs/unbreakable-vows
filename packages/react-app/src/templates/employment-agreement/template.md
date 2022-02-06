{{#eq employerType 1}}
This employment agreement, hereinafter referred to as "Agreement", is entered into and made effective as of the date set forth at the end of this document by and between the following parties:
{{xx individualEmployerName}}, an individual, with the Ethereum address {{**employerAddress**}}; and {{**employeeName**}}, an individual, with the Ethereum address {{**employeeAddress**}}.
{{/eq}}

{{#eq employerType 2}}
This employment agreement, hereinafter referred to as "Agreement", is entered into and made effective as of the date set forth at the end of this document by and between the following parties: {{**organizationEmployerName**}}, an {{**organizationType**}}, with the Ethereum address {{**employerAddress**}}; and {{**employeeName**}}, an individual, with the Ethereum address {{**employeeAddress**}}.
{{/eq}}

Hereinafter, "Employer" will refer to and be used to describe the following party "{{**individualEmployerName**}}{{**organizationEmployerName**}}". Employee will refer to and be used to describe the following party "{{**employeeName**}}". Employer and Employee may be referred to individually as "Party", and collectively as the "Parties."

## Recitals:

WHEREAS, Employer wishes to retain Employee for certain work-related services,
WHEREAS, Employee wishes to render such services to employer.
NOW, therefore, in consideration of the promises and covenants contained herein, as well as other good and valuable consideration (the receipt and sufficiency of which is hereby acknowledged), the Parties do hereby agree as follows:

## Type of Employment:

This Agreement is made for a {{employmentType}}.

## Position:

Employer will employ Employee in the following position: {{**employeePosition**}}. Employee will be responsible for the following duties: {{**employeeDuties**}}
Employee will also be responsible for others duties as may be assigned and may arise from time to time.
Employer reserves the right to change the employee's position, as well as employee's duties, reporting relationships, and others details of employment with the exception of hours and compensation, as may be determined necessary by Employer. Employer agrees to maintain Employee's position and duties as such as may be consistent with Employee's experience, education, training, and/ or other qualification.

## Employment

The terms and conditions of the relationship between Employer and Employee shall be determined by any applicable policies and procedure manuals, employee manuals, or other governing documents belonging to and utilized by Employer and Employer's company, as well as by this Agreement. In case of any dispute or conflict between this Agreement and other written policies and/or procedures owned and utilized by Employer or Employer's company, this Agreement shall govern.

{{#eq trialPeriodExist 1}}

## Trial period

Employee will be subject to a trial period of the following: {{**timePeriod**}}. During this trial period, Employer may terminate the employment relationship at any time, for any reason, in Employer's sole and exclusive discretion, with or without notice.
{{/eq}}

## Employee Covenants

Employee agrees to carry out and perform the duties required by the Position to the best of Employee's skill, ability, and experience. Employee agrees to execute the position faithfully and in compliance with any of Employer's instructions, written and/or oral, announced by Employer. Employee further acknowledges and agrees that Employer may change Employee's position, title, assignments, duties, responsibilities, and reporting requirements at any time, and in Employer's sole and exclusive discretion. Employee agrees that any such change will not result in termination of this Agreement.

## Compensation

{{#eq compensationType 1}}
For the services performed by Employee under the terms of this Agreement, Employee will receive the following compensation: ${{**anualSalary**}} annually.
Payment will be made as follows: {{**detailsAnnualSalary**}}
Any expenses arising directly out of the employment shall be reimbursed to Employee, so long as the expenses were authorized prior to being incurred and appropriate receipts were provided to Employer.
{{/eq}}

{{#eq compensationType 2}}
For the services performed by Employee under the terms of this Agreement, Employee will receive the following compensation: ${{**hourlySalary**}} per hour.
Payment will be made as follows: {{**detailsHourlySalary**}}
Any expenses arising directly out of the employment shall be reimbursed to Employee, so long as the expenses were authorized prior to being incurred and appropriate receipts were provided to Employer.
{{/eq}}

{{#eq compensationType 3}}
For the services performed by Employee under the terms of this Agreement, Employee will receive the following commission compensation structure: {{**CommissionSalary**}}
Any expenses arising directly out of the employment shall be reimbursed to Employee, so long as the expenses were authorized prior to being incurred and appropriate receipts were provided to Employer.
{{/eq}}

{{#eq compensationType 4}}
For the services performed by Employee under the terms of this Agreement, Employee will receive the following wage plus commission compensation structure: {{**WagePlusComissionType**}}
Any expenses arising directly out of the employment shall be reimbursed to Employee, so long as the expenses were authorized prior to being incurred and appropriate receipts were provided to Employer.
{{/eq}}

## Bonus

{{#eq monetaryBonus 1}}
Employee will receive the following Bonus: {{**bonusStructure**}}
{{/eq}}

{{#eq review 1}}

## Perfomance reviews

Employee shall be subject to performance review at the following intervals: {{**frequencyReview**}}
{{/eq}}

## Schedule and Vacations

{{#eq vacation 1}}
Employee is entitled to the following amount of vacation time per year: {{**vacationDays**}} days.
Employee may also receive certain company-wide or national holidays off, which may or may not be compensated in Employer's sole and exclusive discretion.
{{/eq}}

{{#eq vacation 2}}
Employee is entitled to the following amount of vacation time per year: {{**vacationWeeks**}} weeks.
Employee may also receive certain company-wide or national holidays off, which may or may not be compensated in Employer's sole and exclusive discretion.
{{/eq}}

{{#eq rollOver 1}}
If Employee does not utilize all vacation time allotted in one year, Employee will be entitled to roll over the vacation time to the next year. Notwithstanding the foregoing, however, Employee may not have total vacation time in any one year in excess of the following: {{**vacationStockpile**}}
{{/eq}}

## Term & termination

The relationship between Employer and Employee shall be considered at-will. The starting date for the employment is {{**startingDate**}} ("Starting Date").
Employee will be expected to begin work on the Starting date. This Agreement shall be valid and in full effect as of the following term: {{**startingDate**}} to {{**endDate**}}.

Notwithstanding the foregoing, this Agreement may be terminated by either of the parties as outlined below, prior to the expiration of it's natural term.

Employer may terminate this Agreement at any time, with or without notice, for any reason or no reason at all. Employer does not need cause to terminate Employee's employment.
