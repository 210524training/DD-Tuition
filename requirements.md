## Requirements Here

## 1. Overview
    -Provides reimbursements for:
        -University Courses
        -Certfication preparation classes
        -certifications
        -Technical Training
        -Seminars

## Problem
    -Solely relies on email communciation causing inbox clutter and incorrect routing of tasks.
    -No way to record and report on reimbursements awarded, thus the company has no way to identify highly-invested courses that could be developed to be offered in-house.

# Business Rules
    -Employees can claim up to $1000 in tuition reimbursement a year.
    -Events have different reimbursement coverages:
        - University Courses - 80%,
        -Seminars - 60%,
        -Certification Preparation - 75%,
        -Certification - 100%,
        -Technical Training - 90%
        -Other - 30%
    - The monetary amount is calculated:
         AvailableReimburstment = TotalReimburstment ($1000) – PendingReimburstments – AwardedReimburstments
    - Must be adjusted to available amount
    -Books are not covered

# 2. Completing the Tuition Reimbursement Form
    -All Employees must complete the Tuition Reimbursement form one week prior to the start of the event.
    - This form must collect (required): 
        - Basic employee information;
            date,
            time, 
            location,
            description,
            cost,
            grading format,
            type of event;
            work-related justification
        -The employee can optionally include:
                event-related attachments:
                    pdf,
                    png,
                    jpeg,
                    txt,
                    doc file type
                    attachments of approvals already provided of .msg (Outlook Email File) file type and type of approval, 
                   work time that will be missed.  
        -The projected reimbursement should be provided as a read-only field.
### Business Rules
    -Grading formats are pulled from reference table.
    -Certain grading formats require the employee to perform a presentation to management after the event’s completion and prior to awarded reimbursement. Otherwise Passing grade is required for the reimbursement
    -Employee must provide the passing grade cutoff for the course, or choose to use a default passing grade if unknown
    -If an employee provides an approval email, that approval step is skipped (cannot skip BenCo Approval).
    -If the course is < 2 weeks from beginning, the request is marked urgent.

# 3. Direct Supervisor
    -Must provide approval and request additional information from the employee before approval.
##      Business Rules
            -If denied, the Direct Supervisor must provide a reason.
            -If direct Supervisor is also a department head then department head approval is skipped
            -.  If the direct supervisor does not complete this task in a timely matter, the request is auto-approved.
# 4. Department Head Approval
    -The department head must provide approval for Tuition Reimbursement.
    -The Department Head can request additional information from the employee or direct supervisor before approval
##  Business Rules
        -If the Department Head does not complete this task in a timely matter, the request is auto-approved.

# 5. Benefits Coordinator Approval
        - The BenCo must provide approval for Tuition Reimbursement.   This stage is not skippable for any reason.
        -The BenCo can request additional information from the employee, direct supervisor, or department head before approval. 
        -The BenCo has the ability to alter the reimbursement amount.

##      Business Rules:
            -If BenCo changes the reimbursement amount then employee should be notified and given option to canel the request
            - If the BenCo does not approval in a timely matter, an escalation email should be sent to the BenCo’s direct supervisor
            -The BenCo is allowed to award an amount larger than the amount available for the employee.  
                -The BenCo must provide reason for this, and the reimbursement must be marked as exceeding available funds for reporting purposes
# 6. Grade/Presentation Upload
        -Upon completion of the event, the employee should attach either the grade or presentation as approiate.
        -After upload of a grade, BenCo must confirm that the grade is passing.
        -After upload of a presentation direct manager must confirm that the presentation is satisifiatory
        and is presented to appropriate parties. Upon confirmation the amount is awarded to the requestor.

        -Only interested parties can see grades and presentations which are the requestor and approvers