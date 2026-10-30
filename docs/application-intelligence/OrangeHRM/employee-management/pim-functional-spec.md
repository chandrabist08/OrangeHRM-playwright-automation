# How to Add an Employee
This is a feature that allows the user to add employees to the system easily. Upon adding the employee admin user can create login details (username and password) to that particular employee at the same time.

Adding employees to the system can be done via OrangeHRM PIM module. It is possible to maintain employee details such as personal details, job and salary details, contact details, immigration details, emergency contacts etc.. when adding employee details to the system.

Refer the following article to learn more about the adding and employee then to view and edit employee profile.:

 
Step 1 - Go to PIM. Click on ‘Add Employee’. The Add Employee Screen is displayed as follows.


Step 2 - Complete the following fields

Field 	Description
First Name	First Name of the Employee.
Middle Name	Middle Name of the Employee.
Last Name	Last Name of the Employee.
Employee ID	Employee ID is generated automatically. The user can change the Employee ID if required.
Photograph	Profile picture of the employee.
(less than 1MB in size,
Accepts .jpg/.png/.gif file types,
Dimensions recommended: 200 x 200 pixels) 
 
Step 3 – If the ‘Create Login Details’ option is selected, additional fields get displayed as follows.

Step 4 - Complete the following fields.

Field 	Description
Username	Username for the employee.
Password	Enter a strong password.
Confirm Password	Re-enter the password.
Status	
Enable or disable the user account.

Step 5 – Click 'Save'. 


# How to Assign Employee Job Details
Once an employee added to the system, it is incredibly important that we update the employee's job information accurately in his OrangeHRM profile.  Data contained in this page is used for other key modules throughout the OrangeHRM system.

To assign employee's job-related information, follow these few simple steps.

 
Step 01

Go to his PIM > Employee List. 

Step 02

Select the employee from the list to view his profile. 
 

Step 03

Click on Job tab to view his/her job-related information.
 
Step 04

You will be navigated to a read-only view of employee's job information. Click "Edit" and update the relevant fields.

Note: 

Job Titles, Employment Status, Job Category, Sub Unit, Location needs to be preconfigured in admin module before assigning them to employees. Job Specification is retrieved when a Job Title is assigned to the employee. Admin user can update the job specification as a pdf file via Admin > Job > Job Titles > Add/ Edit Job Title  

Step 05
Once you are done updating the fields, click the "Save" button to confirm the updates. 

# How to Add/Remove a Supervisor or Subordinates
In an organization, there are supervisors and they will have subordinates under them who report to them. At times these working hierarchies may need to be changed due to various reasons. The OrangeHRM platform allows you to cope with these changes by adding or removing supervisors and subordinated at any given time.

A supervisor role is given to an employee who has one or many employees reporting to him/her. They will inherit additional capabilities such as; assigning leave on behalf of their subordinates, leave and timesheet approval and many more. A subordinate is an employee who reports to a supervisor.

 # Assigning a Supervisor/Subordinate for an Employee

Step 01

Log in to the OrangeHRM system as an admin and go to "Employee List" (PIM > Employee List).  Select the employee to whom you want to assign a supervisor. You can either select the employee from the list of employees or use the search option to locate the employee.


Step 02

Click on the name of the employee to go into the employee's profile. Then, click on the Report-to tab where it will list down all assigned supervisors and subordinates in two sections.   

Step 03

To add a supervisor, click on the Add button in the Assigned Supervisors tab. Choose the employee whom you wish to assign as a supervisor by typing the name. Next, choose a reporting method from the dropdown menu. Finally, click Save and the employee will be added to the list of Assigned Supervisors

A notification will be displayed to indicate the assiging is successful. 

To add a subordinate, follow the same process by clicking Add Button in the Assigned Subordinates tab.


Note:

Options that come as Reporting methods needs to be preconfigured in PIM > Configrations> Reporting Methods.


 # Editing Supervisor/Subordinate details of an Employee

To edit the supervisor/subordinate details, click on the supervisor's/subordinate's name featured in the list. 

The user shall be able to update the reporting method while in edit mode. Click save after making the necessary changes and they will take effect immediately. 


 # Remove a Supervisor/Subordinate from an Employee

To remove a supervisor, select the supervisor(s) by marking the relevant checkbox as "checked". Then, click the "Delete" button in the "Assigned Supervisor" tab and the supervisor will be removed from the list. A notification will be displayed to indicate the deletion is successful. 

Removing subordinate(s) is the same as removing supervisor(s). First, mark the subordinates by checking the relevant checkboxes. Next, click the "Delete" button in the "Assigned Subordinates" tab and they will be removed from the list. 


# How to Terminate an Employee with a Future Date
A company may hire employees in abundance but simultaneously a company needs to have a proper and simple termination process in order. As much a company invest time and resources in employee hiring and onboarding process it is equally important to ensure a simple, and faster termination process.

Terminations can happen due to many reasons and some of them are as below : 

Contract Not Renewed
Deceased
Resigned
Resigned- company requested
Retired
The “Terminate employee” feature of OrangeHRM can include above and many more reasons of termination hence easing the process of termination for the employers.   

Go to PIM-> Employee List

Step 1 - The user needs to select the employee which they are planning to terminate from the employee list. Then, navigate to the ‘Job’ Tab of the employee profile, click the  ‘Terminate Employee’ button. The Terminate Employment Screen appears as below. 
Step 2 – Select a ‘Reason’. from the drop down of predefined termination reasons. Under PIM> Configuration> Termination Reasons. (Refer following article 'Add Termination Reasons')

Step 3 - Add the termination date.

Note - If the termination date is a future date, then the system does not do any changes to the profile. The employee has access to the system until the terminated date is reached. On the day of the termination, the system terminates the employee and disable the employee user account.

Step 4 - Add the ‘Note’ (optional). 

Step 5 – Click ‘Confirm.’ Then the employee is or will be removed from the current employee list based on the date set.

# How to Filter the Employee List
The employee list shows all the employees entered and imported into the PIM. You can view/edit details of a particular employee by clicking on the employee’s name, display image or ID. To view the employee list, select PIM > Employee List from the Main Menu. The Employee List Screen will appear. 


It is possible to sort employee data in alphabetical order by clicking on column headers. 

Step 1 - Use the filters to search for employees. Below are the options to use as filtering criteria. You can combine multiple filters.

Field 	Description
Employee Name	Filter by the Employee Name
ID	Filter by the Employee ID
Employment Status	Filter by the Employment Status
Include	Search current or past employees or both
Supervisor Name	Filter by the Manager
Job Title	Filter by the Employee Job Title
Subunit

Filter by the Department

Step 2 - Click search to see the results of your desired selection

Step 3 - When “Reset” is selected within the Filter, the search section results will be reset and the search filters will change to the default view.


# How to Create Custom Fields
Organizations gather a variety of information from employees for many reasons. few of the many reasons could be to :

Establish contact information necessary for the company.
Bank information for salary remittance.
Apart from the above reasons, a company may need additional details such as blood type, marriage date and etc. The company may need this data for various reasons. It can be challenging to gather different types of unique information as systems may not have the capability to add custom data but only the basic data such as Name, Gender, Age, Work Experience and etc. However, OrangeHRM opensource platform allows a company to create custom fields and gather a variety of unique data.

This feature allows the admin to customize and add fields to all the screens of the PIM Module that may be specific and relevant to the company.

Go to PIM -> Configuration -> Custom Fields.  

Step 1 - Click the ‘Add’ button. Upon clicking the button  'Add Custom Field Section’ Screen will pop up as below.

Step 2 - Complete following fields 

Field	Description
Field Name	Name of the additional information field you want to maintain for the employees 
Screen	The screen you want to add the custom field to (Only existing screens are available to select)
Type	
The data type of the custom field.

Ex:

If the custom field is Blood Type, the data type can be set as 'Text'.
If the custom field is Special Allowance, the data type can be set as 'Number'
Note - Only 'Text', 'Number' and 'Drop Down' data types are available to set custom fields.

Step 3 – Click ‘Save.’ Upon clicking the button the new fields will be added to the specified screen.

Note - Only 10 custom fields will be allowed to add in the OrangeHRM opensource platform

Step 4 - Select the custom field from the custom field list (Defined Custom Fields) in order to edit the info 

Step 5 - Select the check box in front of each custom field in the custom field list (Defined Custom Fields) in order to delete it. Then click 'Delete' button.

Note - Custom fields can be deleted only if no data saved under them in PIM for any employee.


# How to Create Dynamic Reports
'The PIM Reports' is a robust reporting method that enables users to generate reporting based on all fields in the PIM module. 

This feature allows admins to create custom reports and select fields in the PIM module that needs to be displayed on the report. The user can generate detailed and precise PIM reports by adding relevant fields and setting relevant criteria to process the report. 

Go to PIM -> Reports, to view the available Reports. Below screen will be displayed. You may search for the pre defined reports using the 'Report Name' filter available.

Step 1 - Click the 'Add' button. Define Report screen will appear as below.


Step 2 – Name the report for your preferred choice

Step 3 – Add the filter criteria of the report by selecting the fields available in the 'Selection Criteria. You may remove added selection criteria by clicking on the red 'x' in front.

Step 4 -  Select between active and inactive employees or both to generate the data for.

Step 5 – Add the display fields of the report by selecting the groups available in the 'Display Field Groups' and the respective fields under those groups available in the 'Display Fields'. You may remove added display fields by clicking on the red 'x' in front.

Step 6 – Click on the "Save" button to save the report. Once saved you can access the same report in the PIM report list as explained in the beginning of this article.

 