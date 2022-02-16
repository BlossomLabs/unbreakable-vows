# Independent Contractor Agreement

It is often used when an individual or business is hired to complete a specific project or task on a short term basis.

## Information of involved parties
- **clientType** *option* Is the client an individual or an organization?
  - Individual
  - Organization
- **individualClientName** *text* (clientType==1) What is the individual client name?
- **individualClientAddress** *address* (clientType==1) Ethereum address of the client
- **organizationClientName** *text* (clientType==2) What is the organization client name?
- **organizationClientAddress** *address* Ethereum address of the client
- **contractorName** *text* Who is being hired to perform services?
- **contractorAddress** *address* Ethereum address of the client

## Independent contractor's services

## Compensation
- **compensationType** *option* How will the independent contractor be paid?
  - A fixed wage
  - A set fee
  - After completing certain milestiones
  - Other

## Payment schedule
- **paymentSchedule** *option* When will the payments be made?
  - Every week
  - Every month
  - After independent contractor sends an invoice

## Expenses and Reimbursement

Expenses

## Commencement of Services

## Termination of Agreement

## Confidentiality

## Insurance

## Disputes

## Agreement Date

# Independent Contractor Agreement

## Information of involved parties
{{#eq clientType 1}}
This independent contractor Agreement (this "Agreement") is made as of this {{**agreementDate**}} by and between {{**individualClientName**}} ("Client"), an individual, with the Ethereum address {{**IndividualClientAddress**}}; and {{**contractorName**}} ("Independent Contractor"), an individual, with the Ethereum address {{**contractorAddress**}}. 
{{/eq}}

{{#eq clientType 2}}
This independent contractor Agreement (this "Agreement") is made as of this {{**agreementDate**}} by and between {{**organizationClientName**}} ("Client"), an organization, with the Ethereum address {{**OrganizationClientAddress**}}; and {{**contractorName**}} ("Independent Contractor"), an individual, with the Ethereum address {{**contractorAddress**}}. 
{{/eq}}

Client and Independent contractor may each be referred to in this Agreement as a "Party" and collectively as the "Parties."

## Independent contractor's services.
Independent contractor shall provide the following services to Client ("the services"): {{**servicesList**}}. In addition, Independent contractor shall perform such other duties and tasks, or changes to the services, as may be agreed upon by the Parties.

## Compensation
{{#eq compensationType 1}}
In consideration for independent Contractor's performance of the services, client shall pay independent contractor {{**fixedWageRate**}}, as a fixed wage {{**fixedWageRateFrequency**}}. 
{{/eq}}

{{#eq compensationType 2}} 
In consideration for independent Contractor's performance of the services, client shall pay independent contractor {{**setFee**}}, as a set fee. 
{{/eq}}

{{#eq compensationType 3}}
In consideration for independent Contractor's performance of the services, client shall pay independent contractor, the following ways: {{**completedCertainMilestones**}}
{{/eq}}

{{#eq compensationType 4}} 
In consideration for independent Contractor's performance of the services, client shall pay independent contractor, the following ways: {{**otherCompensation**}}
{{/eq}}

## Payment Schedule 
{{#eq paymentSchedule 1}} 
Independent contractor will be paid {{**weeklyPaymentSchedule**}}.
{{/eq}}

{{#eq paymentSchedule 2}} 
Independent contractor will be paid {{**monthlyPaymentSchedule**}}.
{{/eq}}

{{#eq paymentSchedule 3}} 
Independent contractor wil be paid within {{**invoicePaymentSchedule**}} days after receiving independent contractor invoice. Independent contractor will submit invoices for payment {{**invoiceFrecuency**}}.
{{/eq}}
