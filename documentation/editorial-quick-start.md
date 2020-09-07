# Editorial Quick Start

--------------------------------------------------------------------------------

\[[Up](README.md)\] 
--------------------------------------------------------------------------------

## Introducing

Assuming you are familiar with the CoreMedia Studio and that you created a
new article which should be published at a certain time in the future, or 
the article should be sent to another editor for review who will then forward it 
to publication to a third editor. This guide shows how this task can be accomplished
by means of the publication workflow extensions.

### Start the Workflow

After having completed a new article you can start publication workflows using 
the context menu on the document as shown here:

![ContextMenu-Publication-Workflows](images/contextmenu-publication-workflows.png)

### Schedule the Publication

Choose the _Scheduled Publication_ from the list of _Workflow Type_ and select the
_Scheduled Date_. Click on _Start_ to start the workflow instance.

![Schedule-Publication](images/schedule-publication.png)

### Monitor the Scheduled Publication

While the scheduled publication is yet pending it is listed under the pending workflows.
A scheduled publication workflow instance hat the specific timer icon.
Notice that as long as it is pending the document is locked so that it cannot be edited.

![Monitor-Scheduled-Publication](images/monitor-scheduled-publication.png)

By clicking on the workflow instance you get the details of the workflow. Especially
you can see the scheduled date of the publication.

![Details-Scheduled-Publication](images/details-scheduled-publication.png)

### Completion of the Scheduled Publication

When the scheduled date of the publication expires the document will be automatically
published. The workflow instance is no longer pending and is now listed under the finished workflows:

![Finished-Scheduled-Publication](images/finished-scheduled-publication.png)

Notice that the document is now longer locked and can be edited.

### Start the Three Step Publication Workflow

You can also start a three-step publication workflow to send an edited document through 
a review and publication process by different editors. 
Choose the _Reviewed and Confirmed Publication_ from the list of _Workflow Type_

![Three-Step-Publication](images/three-step-publication.png)

### Assign Workflow To People

Assign the task of approving the document to another editors by simply selecting 
the option _All Eligible People_ or specifying one or more editors:  

![Assign-Workflow](images/assign-workflow.png)

Click on _Start_ to start the workflow instance.

### Monitor the Three-Step Publication

While the three-step publication is yet pending it is listed under the pending workflows.
Notice that as long as it is pending the document is locked so that it cannot be edited.

![Monitor-Three-Step-Publication](images/monitor-three-step-publication.png)

By clicking on the workflow instance you get the details of the workflow. Especially
you can see the editors the workflow instance is assigned to.

![Details-Three-Step-Publication](images/details-three-step-publication.png)

### Approve Step of the Three-Step Publication

To editors who the workflow instance is assigned to - _Dave_ in this example - 
it is now listed under the inbox of workflows. Note that the instance's title contains
_Approve_ as the task to be performed.

![Offered-Approve-Three-Step-Publication](images/offered-approve-three-step-publication.png)

By clicking on the workflow instance you get the details of the workflow, that is,
who has started the workflow and which document is to be reviewed.
Accept the task when you are ready to review and approve the document. 

![Accept-Approve-Three-Step-Publication](images/accept-approve-three-step-publication.png)

You can now review the document. When everything is fine select _Confirm_ as 
next workflow step and assign the task to yet another editor like _Adam_ in this example.

![Approve-Three-Step-Publication](images/approve-three-step-publication.png)

Click on _Apply_ then the workflow instance moves from the inbox to the pending.

### Publish Step of the Three-Step Publication

To editors who the workflow instance is assigned to - _Adam_ in this example - 
it is now listed under the inbox of workflows. Note that the instance's title contains
_Confirm_ as the task to be performed.

![Offered-Confirm-Three-Step-Publication](images/offered-confirm-three-step-publication.png)

By clicking on the workflow instance you get the details of the workflow, that is,
who has started the workflow and which document is to be published.
Accept the task when you are ready to review and publish the document. 

![Accept-Publish-Three-Step-Publication](images/accept-publish-three-step-publication.png)

When everything is fine, and the document can be published, make sure the next workflow step is 
_Publish_ and click on _Apply_ to publish the document.

![Publish-Three-Step-Publication](images/publish-three-step-publication.png)

Well done. The document is now published!
