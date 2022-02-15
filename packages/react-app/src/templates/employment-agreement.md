# Employment agreement

A employment agreement is the document by which employers and their employees can define their rights and obligations at the start of the employment relationship.

## Introduction
- **employerType** *option* Is the employer an individual or an organization?
  - Individual
  - Organization
- **individualEmployerName** *text* (employerType==1) What is the employer's name?
- **organizationEmployerName** *text* (employerType==2) What is the employer's business name?
- **organizationType** *option* (employerType==2) What type of organization is the employer's business?
  - Corporation
  - Limited liability company
  - Partnership
  - DAO
- **employerAddress** *address* (employerType) What is the employer's Ethereum address?
- **employeeName** *text* (employerType) What is the employee’s name?
- **employeeAddress** *address* (employerType) What is the employee's Ethereum address?

## Type of employment
- **employmentType** *option* What type of employment will this relationship be?
  - Permantent full-Time
  - Permanent part-time
  - Fixed-term

## Position
- **employeePosition** *text* What will be the employee's position?
- **employeeDuties** *longtext* Enter the employee’s duties, as they are expected to be performed under this contract.

## Trial period
- **trialPeriodExist** *option* Is the employee subject to any kind of probationary period at the start of the employment relationship?
  - Yes
  - No
- **timePeriod** *number* (trialPeriodExist==1) How long is the probationary time period?

## Compensation
- **compensationType** *option* How will the compensation be?
  - Annual
  - Hourly
  - Commission
  - Wage plus comission
- **currencyList** *token* What is the currency or currencies that will be used to pay this salary?
- **annualSalary** *number* (compensationType==1) How much will the annual salary be, in U.S. dollars?
- **detailsAnnualSalary** *longtext* (compensationType==1) Enter the specific details of how payment is made to the employee each pay period.
- **hourlySalary** *number* (compensationType==2) Amount of hourly compensation the employee will receive, in U.S. dollars.
- **detailsHourlySalary** *longtext* (compensationType==2) Enter the specific details of how payment is made to the employee each pay period.
- **comissionSalary** *longtext* (compensationType==3) Enter the details of the commission compensation structure.
- **wagePlusCommission** *longtext* (compensationType==4) Enter the details of the wage plus commission compensation structure.

## Bonus
- **monetaryBonus** *option* Does employee's compensation include any kind of monetary bonus?
  - Yes
  - No
- **bonusStructure** *longtext* (monetaryBonus==1) Enter the details of the employee's bonus structure.

## Performance reviews
- **review** *option* Will the employee be subject to any kind of review of their compensation, such as a formal or informal discussion at specific time periods?
  - Yes
  - No
- **reviewFrequency** *option* (review==1) How often will compensation be reviewed?
  - Monthly
  - Quaterly
  - Half-year
  - Annual

## Schedule and Vacations
- **schedule** *longtext* What will the employee’s work schedule be (including number of hours, specific days if any, etc.)?
- **vacationExist** *option* Will the employee have vacation periods?
  - Yes
  - No
- **vacation** *option* (vacationExist==1) Will the employer describe how employee can take vacation?
  - Days
  - Weeks
- **vacationDays** *number* (vacation==1) How many days of vacation will employee receive per year?
- **vacationWeeks** *number* (vacation==2) How many weeks of vacation will employee receive per year?
- **rollOver** *option* (vacationExist==1) If the employee does not use all of their vacation time, does it roll over to the next year?
  - Yes
  - No
- **vacationLimit** *option* (rollOver==1) Does the employee have a limit to how much vacation time they can roll over and stockpile?
  - Yes
  - No
- **vacationStockpile** *number* (vacationLimit==1) How much vacation time can the employee roll over and stockpile before they must use it or lose it (in days)

## Renovation
- **renovation** *option* Should the agreement automatically renew?
  - Yes
  - No
- **writtenNotice** *number* (renovation==1) How many weeks notice does the employee need to give for termination?

## Governing Law
- **governingLaw** *option* Which will be the arbitrator of this agreement?
  - Celeste
  - Ethereum address

## Disputes
- **disputes** *option* In the event a dispute arises, how will it be resolved?
  - Arbitration
  - Mediation
  - Mediation and Arbitration
- **startingDate** *date* What is the date of this agreement?
- **endDate** *date* What is the date the employment relationship will end?

# Employment agreement

{{#eq employerType 1}}
This employment agreement, hereinafter referred to as "Agreement", is entered into and made effective as of the date set forth at the end of this document by and between the following parties: {{**individualEmployerName**}}, an individual, with the Ethereum address {{**employerAddress**}}; and {{**employeeName**}}, an individual, with the Ethereum address {{**employeeAddress**}}.
{{/eq}}

{{#eq employerType 2}}
This employment agreement, hereinafter referred to as "Agreement", is entered into and made effective as of the date set forth at the end of this document by and between the following parties: {{**organizationEmployerName**}}, a {{option organizationType "Corporation" "Limited Liability Company" "Partnership" "Decentralized Autonomous Organization"}}, with the Ethereum address {{**employerAddress**}}; and {{**employeeName**}}, an individual, with the Ethereum address {{**employeeAddress**}}.
{{/eq}}

Hereinafter, "Employer" will refer to and be used to describe the following party "{{**individualEmployerName organizationEmployerName**}}". Employee will refer to and be used to describe the following party "{{**employeeName**}}". Employer and Employee may be referred to individually as "Party", and collectively as the "Parties."

## Recitals

WHEREAS, Employer wishes to retain Employee for certain work-related services, 
WHEREAS, Employee wishes to render such services to employer.
NOW, therefore, in consideration of the promises and covenants contained herein, as well as other good and valuable consideration (the receipt and sufficiency of which is hereby acknowledged), the Parties do hereby agree as follows:

## Type of Employment

This Agreement is made for a {{option employmentType "permanent full-time" "permanent part-time" "fixed-term"}}.

## Position

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
{{/eq}}

{{#eq compensationType 2}} 
For the services performed by Employee under the terms of this Agreement, Employee will receive the following compensation: ${{**hourlySalary**}} per hour. 
Payment will be made as follows: {{**detailsHourlySalary**}}.
{{/eq}}

{{#eq compensationType 3}}
For the services performed by Employee under the terms of this Agreement, Employee will receive the following commission compensation structure: {{**CommissionSalary**}}.
{{/eq}}

{{#eq compensationType 4}} 
For the services performed by Employee under the terms of this Agreement, Employee will receive the following wage plus commission compensation structure: {{**WagePlusComissionType**}}.
{{/eq}}

Any expenses arising directly out of the employment shall be reimbursed to Employee, so long as the expenses were authorized prior to being incurred and appropriate receipts were provided to Employer.

{{#eq monetaryBonus 1}}
## Bonus

Employee will receive the following Bonus: {{**bonusStructure**}}.
{{/eq}}

{{#eq review 1}}
## Perfomance reviews 

Employee shall be subject to performance review at {{option reviewFrequency "a monthly" "a quaterly" "a half-year" "an annual"}} interval.
{{/eq}}

## Schedule and Vacations

The Employee’s work schedule will be: {{**schedule**}}.

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
The relationship between Employer and Employee shall be considered at-will. The starting date for the employment is {{date startingDate}} ("Starting Date"). 
Employee will be expected to begin work on the Starting date. This Agreement shall be valid and in full effect as of the following term: {{date startingDate}} to {{date endDate}}. 

Notwithstanding the foregoing, this Agreement may be terminated by either of the parties as outlined below, prior to the expiration of it's natural term.

Employer may terminate this Agreement at any time, with or without notice, for any reason or no reason at all. Employer does not need cause to terminate Employee's employment. 
