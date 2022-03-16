# Mediation Agreement

A Mediation Agreement is a document between two or more parties to a dispute who have decided to try and resolve their dispute without the need of any courts or external third party with authority, through something called a "mediation." The parties appoint a mediator, who sets up a time to meet with them together and help facilitate a resolution. The Mediation Agreement is a simple document that just memorializes the decision that the parties have come to about mediation.

## Introduction 
- **firstPartyType** *option* Is the first party to the Mediation Agreement a company or an individual?
  - Individual
  - Organization
  > Select whether the first party to the Mediation Agreement is a organization or an individual person. If it is a sole proprietor or individual, click "individual". If it is any type of organized business, even a small business, click "Organization".
- **individualFirstPartyName** *text* (firstPartyType==1) What is the full name of the first party to this Mediation Agreement?
  > Enter the full business name of the first party.
- **organizationFirstPartyName** *text* (firstPartyType==2) What is the full name of the first party to this Mediation Agreement?
  > Enter the full business name of the first party.
- **organizationFirstPartyType** *option* (firstPartyType==2) What type of organization is the first party?
  - Corporation
  - Limited liability company
  - Partnership
  - DAO
  > Choose the type of organizational structure that best describes the first party.
- **firstPartyAddress** *address* What is the Ethereum address of the first party?
- **secondPartyType** *option* Is the second party to the Mediation Agreement a company or an individual?
  - Individual
  - Organization
  > Select whether the first party to the Mediation Agreement is a organization or an individual person. If it is a sole proprietor or individual, click "individual". If it is any type of organized business, even a small business, click "Organization".
- **individualSecondPartyName** *text* (secondPartyType==1) What is the full name of the second party to this Mediation Agreement?
  > Enter the full name of the second party.
- **organizationSecondName** *text* (secondPartyType==2) What is the full name of the second party to this Mediation Agreement
  > Enter the full business name of the second party.
- **organizationSecondPartyType** *option* (secondPartyType==2) What type of organization is the first party?
  - Corporation
  - Limited liability company
  - Partnership
  - DAO
  > Choose the type of organizational structure that best describes the second party.
- **secondPartyAddress** *address* What is the Ethereum address of the second party?

## Screening of the dispute
- **disputeDetails** *longtext* Enter, in as much detail as needed, the screening of the dispute by the mediator with most relevant facts surrounding the dispute between the parties.
  > Here, describe the reason the parties wish to mediate. This may include a general overview of their dispute.
- **previousContractExist** *option* Has the dispute come about under a contract that the parties signed?
  - Yes
  - No
- **previousContractDetails** *longtext* (previousContractExist==1) Enter the contract details. (You can provide links)

## Mediator
- **mediatorName** *text* Enter the full name of the appointed mediator.
  > Enter the name of the mediator the parties have appointed.
- **mediatorAddress** *address* What is the Ethereum address of the mediator? 
- **mediatorType** *option* Are the fees paid to an organization or to an individual mediator? 
  - Individual 
  - Organization

## Fees
- **feePercentage** *option* How will the fee be paid? 
  - Equal between the parties
  - First Part will pay it
  - Other
  > Select whether the parties are splitting the mediation fees equally, or it will be paid by one of the parties. 
- **otherFeePercentage** *text* (feePercentage==3) Enter who will pay the fees. 

## Agreement 
- **agreement** *longtext* Enter, in as much detail as needed, the voluntary agreement concluded between the parties.
- **startingDate** *date* What is the date this Mediation Agreement will be effective?
- **endDate** *date* What is the deadline for compliance with the agreement?

## Agreement Reviews
- **review** *option* Will the agreement be subject to any kind of compliance review  at specific time periods?
  - Yes
  - No
- **reviewFrequency** *option* (review==1) How often will the agreement be reviewed?
  - Weekly
  - Monthly
  - Quarterly

# Mediation Agreement 
## Introduction
{{#eq firstPartyType 1}}{{#eq secondPartyType 1}}
This mediation agreement, hereinafter referred to as “Agreement”, is entered into and made effective as of {{**date startingDate**}} (the "Effective date"),by and between the following parties: 
{{**individualFirstPartyName**}} an individual, with the Ethereum address {{**firstPartyAddress**}}; and {{**IndividualsecondPartyName**}} an individual, with the Ethereum address {{**secondPartyAddress**}}. 
{{/eq}}{{/eq}}

{{#eq firstPartyType 1}}{{#eq secondPartyType 2}}
This mediation agreement, hereinafter referred to as “Agreement”, is entered into and made effective as of {{**date startingDate**}} (the "Effective date"),by and between the following parties: 
{{**individualFirstPartyName**}} an individual, with the Ethereum address {{**firstPartyAddress**}};and {{**organizationSecondPartyName**}} an organization, with the Ethereum address {{**secondPartyAddress**}}. 
{{/eq}}{{/eq}}

{{#eq firstPartyType 2}}{{#eq secondPartyType 1}}
This mediation agreement, hereinafter referred to as “Agreement”, is entered into and made effective as of {{**date startingDate**}} (the "Effective date"),by and between the following parties: 
{{**organizationSecondPartyName**}} an organization, with the Ethereum address {{**firstPartyAddress**}}; and {{**IndividualsecondPartyName**}} an individual, with the Ethereum address {{**secondPartyAddress**}}. 
{{/eq}}{{/eq}}

{{#eq firstPartyType 2}}{{#eq secondPartyType 2}}
This mediation agreement, hereinafter referred to as “Agreement”, is entered into and made effective as of {{**date startingDate**}} (the "Effective date"),by and between the following parties: 
{{**organizationSecondPartyName**}} an organization, with the Ethereum address {{**firstPartyAddress**}}; and {{**organizationSecondPartyName**}} an organization, with the Ethereum address {{**secondPartyAddress**}}. 
{{/eq}}{{/eq}}

The parties may be referred to individually as "Party" and collectively as "The Parties."

## Recitals
WHEREAS, the parties have found themselves embroiled in a dispute, the nature of which is as follows ("the dispute"): {{**disputeDetails**}};
{{#eq previousContractExist 1}}
WHEREAS, the dispute has arisen under a contract the Parties signed ("The contract"), which details are the following: {{**previousContractDetails**}};
{{/eq}}
WHEREAS, the parties wish to resolve the Dispute between them and understand that litigation can be costly and time-consuming;
WHEREAS, the parties have together decided to appoint a mediator ("the Mediator") to resolve the dispute through mediation ("the Mediation");
{{#eq mediatorType 1}} WHEREAS, the mediator shall be {{**mediatorName**}}, an individual with the Ethereum address {{**mediatorAddress**}};
{{/eq}}
{{#eq mediatorType 2}} WHEREAS, the mediator shall be {{**mediatorName**}}, an organization with the Ethereum address {{**mediatorAddress**}};
{{/eq}}
WHEREAS, the mediator agrees to mediate the parties dispute; 
NOW, therefore, in consideration of the promises and covenants contained herein, as well as other good and valuable consideration (the receipt and sufficiency of which is hereby acknowledged) , the Parties do hereby agree as follows: 

## Article 1. Mediation
The Parties each agree that they are entering into this Mediation Agreement voluntarily. In the mediation, the mediator will assist the parties in reaching a collaborative resolution to their Dispute. 
Each party understands that the mediator is not able to rule on the dispute, but rather, is there to help the Parties come to their own agreement. Each party understands that the mediator will not be providing any legal advice, and each party is encouraged to seek their own independent legal counsel throughout the course of the mediation and after. 
The parties themselves will determine the scope  of the mediation, with assistance from the Mediator. 

## Article 2. Mediator
The mediator will be responsible for the following in the course of the Mediation: 
a) Ensuring that each party understands Mediation is a voluntary process;
b) Remaining impartial to assist the Parties in coming to their own resolution;
c) Conducting caucus meetings with the individual Parties as needed;
d) Requesting any documentation as needed from the Parties;
e) Setting a date and time for the Mediation and communicating that date and time to the Parties. 

## Article 3. Fees
{{#eq feePercentage 1}} 
The parties will split the fees of the mediation equally and each shall be responsible for remitting payment individually before the "Mediation"
{{/eq}}

{{#eq feePercentage 2}} 
The first party shall be responsible for the complete payment of the mediation. 
{{/eq}}

{{#eq feePercentage 3}} The fee will be paid as follows: {{**otherFeePercentage**}}
{{/eq}}

## Article 4. Agreement
The agreement concluded by the parties is as follows: {{**agreement**}}

{{#eq review 1}}
## Article 5. Agreement Reviews
The mediator may close the case after three months from the signing of the initial agreement. The agreement will be reviewed by the parties {{**reviewFrequency**}}
{{/eq}}

## Article 6. Confidentiality
The parties agree that the Mediation will be confidential. All discussions will not be admissible in any court proceeding and the Mediator will not testify. If the parties sign a conclusory agreement at the end of the mediation, this may be admissible. 

## Article 7. Ending the Mediation
Participation in mediation is voluntary. A party or the mediator may end the mediation at any time.