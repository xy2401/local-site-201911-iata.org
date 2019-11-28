IATA Reader for Windows
Version 1.0


-- TABLE OF CONTENTS --

SYSTEM REQUIREMENTS
PRODUCT SOFTWARE INSTALLATION
ACTIVATION
UPDATES
PUBLICATION UPDATE
LIBRARY CONFIGURATION FILE
PROXY SUPPORT
NOTES ON WINDOWS 8/10
PRODUCT SUPPORT
IATA ONLINE
NOTES


SYSTEM REQUIREMENTS
-------------------

- Vista SP2, Windows 7 SP1, Windows 8.1, Windows 10 (see "NOTES ON WINDOWS 8/10")
- Intel Pentium or compatible processor
- 16 bit colour display, 1024 x 768 resolution or higher
- Microsoft .NET Framework 4.0 
  Microsoft .NET Framework 4.0 installer is not included with this installer.
  Administrator permissions are required for installation
- Internet connection (for automatic updates and downloads)
- Publication requirements are provided with each publication. Publications are sold separately.

Optional requirements may apply based on purchased publications. Those may include but are not limited to:
- Microsoft Internet Explorer 8 or better
- Adobe Acrobat or Adobe Reader software version 6.0 or higher


PRODUCT SOFTWARE INSTALLATION
-----------------------------

Step 1: Verify if the .NET 4.x Framework is installed

The IATA Reader requires .NET 4 to run. It will run under the 4.0 variants, 4.5 variants and 4.6 variants.

If your operating system is Windows 8 or better, a compatible variant of the .NET Framework should already be installed. Note that your organization may have removed the .NET Framework.

If your operating system is Windows Vista SP3 or Windows 7 SP1 the .NET Framework might need to be installed. You may ask your system administrator to verify if one of the .NET 4 variant is already installed or use this resource from Microsoft to help determine if the .NET Framework is already installed:

https://msdn.microsoft.com/en-CA/library/hh925568(v=vs.110).aspx

Download and install the .NET 4.x Framework using the following links:

.NET 4 for Vista SP3 and Windows 7 SP1: https://www.microsoft.com/en-ca/download/details.aspx?id=17851

Important: Administrative permissions are required to install the .NET Framework.

Step 2: Download the IATA Reader installer

The IATA Reader is free to download and install. The IATA Reader installer can be downloaded directly using this link:
  https://cargo-download.iata.org/Reader/1.0.0.0/Installer/IATAReaderInstaller.v1.0.exe
Or navigate to the Reader page at https://pubdownload.iata.org?desktopreader=show and follow the instructions present on that page.

Step 3: Install the IATA Reader

1. Double-click the installer file downloaded on step 2, or, from the browser, select Run instead of Save when downloading if that option is available.
2. The IATA Reader installer setup process will present a license agreement that must be agreed to in order to continue with the installation.
3. Enter user and company name information.
4. Accept the default software installation folder or select an alternate folder.
   DO NOT install the IATA Reader in your desktop folder as your desktop will clutter with files related to the Reader installation.
   Install the IATA Reader in a location where you have read/write permissions. Without write permissions the Reader may not be able to update itself.
   For example, "Program Files" or "Program Files (x86)" are protected area that cannot be written to unless you have admin permissions.
5. Follow the remaining prompts to complete the installation.

The IATA Reader installation does not require elevated privileges be default and can be installed by regular users.
   DO NOT install the IATA Reader in locations requiring elevated privileges unless the user account has those privileges. Some functionality, like update, will not work correctly if privileges are required but unavailable. Such locations include "Program Files (x86)".
Note that elevated privileges may be required for installation depending on the security policies put in place by your organization.

Install the IATA Reader from the account it is going to be used because some functionality like updates will be used from the user account. If rights are not available to the user doing the update then the update may fail. For example if an IT department decides to install the IATA Reader using the administrator account, for all users, the users may be not be able to update the application since writing the updated files will be attempted in locations requiring administrator rights. 


ACTIVATION
----------
The IATA Reader application does not require a product key and activation but most IATA publications compatible with the IATA Reader must be activated before first use. This section provides information pertinent to all publications that must be activated. 

Important: Activation is best performed online and requires a working internet connection. Your organization might have security policies that prevent using the internet from the IATA Reader or related executables. If no internet connection is available a manual (offline) activation will be required.

Before first use of a publication requiring activation, the IATA Reader will start an activation wizard that will guide you through the activation process and provide useful information.

To activate you must have your product key in hand. The product key is generally delivered in an email notification received after purchase of an IATA Reader publication.

The activation process also asks for an email address. The email address will be necessary, in particular, to retrieve your product key in case it is lost and validate ownership. The email address will only be used for matters regarding IATA products. If neither the product key nor the email address can be provided and verified, support cannot be offered.

Your product key can be used to activate the IATA Reader publication on a single computer. The product key is for your sole usage and should not be shared. Please read the publication's EULA for details about the single user license terms and conditions. The EULA is presented the first time the publication is opened for viewing, before the activation wizard.

Firewall information
The activation and subsequent validations are performed using the proxy settings of Internet Explorer. HTTP protocol is used. The executable "TurboActivate.exe" is used to perform the activation and may need to be added to the list of approved application.

The following sites may be reached during activation and validation:
-   http://wyday.com
-   https://wyday.com

The following ports are used:
-   80 (http)
-   443 (https)

Virtual environment
Activation will be denied on virtual environments. Virtual environments include, for example, Remote Services and RemoteApp, Citrix solutions based on Xen technologies, Hyper-V enabled computers, emulation software from VMWare, Oracle, etc. 

To activate on virtual environments, please contact IATA using the support email address pubsupport@iata.org.

Manual (offline) activation
If automatic, online activation is not possible from the IATA Reader, you can perform a manual activation. A manual activation is performed using a request/response process: 
1) Generate then register an Activation Request with the activation system and 
2) Generate then register an Activation Response with the application. 

The Activation Request is generated from the publication's activation wizard. It is a simple text file that contains XML data understood by the activation system. Once generated, the Activation Request must be registered with the activation system. To do so, navigate your browser to "http://cargo-download.iata.org" and click the "Manual Activation" link. The activation Request file MUST be generated from the computer on which the application is going to be used but the files may be uploaded and downloaded from a different computer.

Upload the Activation Request file and, upon successful validation, you will be prompted to download the Activation Response file. As with the request file, the Activation Response file is a simple text file containing XML data. Download the Activation Response file to your desktop, for example, and import that file back using the publication's activation wizard to complete the process. As with the request file, the response file can be downloaded from another computer that has a working internet browser, then copied and imported on the computer where the IATA software is installed.

If no internet is available, you will need to send the Activation Request file attached to an email addressed to pubsupport@iata.org. The support team will send an Activation Response file to complete the process. Send the file from a computer that has a functioning email software.

Deactivation
If the publication needs to be used on a new computer, or the publication needs to be provided to another user, the current publication must be deactivated from our server first. Internet access is required for easy online deactivation. If internet is not available to the application or the computer hosting the publication, a manual deactivation will be required.
Deactivation can be performed using the following methods:
1. By doing an online deactivation. Internet access is required.
   Use the "Deactivate Online" button in the Activation tab on the publication's Control Panel(*).
2. By doing a manual deactivation. 
   Internet is not required on the computer hosting the publication.
   Use the "Offline Deactivation" button in the Activation tab on the publication's Control Panel(*). That option deactivates the publication from the computer and generates a Deactivation Request file on your desktop.
   On a computer with internet access, navigate to "http://pubdownload.iata.org" and click the "Manual De-activation". Upload the Deactivation Request file to return the license to the server.
   If no internet is available at all, you will need to send the Deactivation Request file attached to an email addressed to support@iata.org. The support team will complete the process on your behalf. Send the file from a computer that has a functioning email software.
3. By removing the publication from the Library. Internet access is required.
   Removing a publication from the Library will automatically try to deactivate the publication. A publication will not be removed if it can't be deactivated.
   If deactivation fails while removing, perform a manual deactivation first then remove the publication.
   A publication can be removed by using the Remove icon (trash can icon) on the publication's tile.
4. Deactivating all publications
   The Management tab in the backstage area of the IATA Reader has two options for deactivation:
   1) Deactivate all publications online: All publication available in the Library will be deactivated online. Internet access is required.
   2) Deactivate all publications offline: This option will generate deactivation request files for each activated publication in the Library. The files will be saved on your desktop and must be sent to IATA, as per "2. By doing a manual deactivation", above.

(*)Note: A publication's Control Panel can be opened using the Tools icon (dented wheel icon) on the publication's tile.

Reactivation on another computer
You can activate a publication on another computer as long as the current publication gets deactivated properly against our activation server. It is not necessary to remove a publication from a computer before re-activating on another. Failure to notify our server of the deactivation will result in a "product key is already in use" message when reactivating on another computer.


UPDATES
-------
The IATA Reader contains an updating mechanism used to provide fixes if serious problems are found in the application, to provide updated functionality or increase the Reader compatibility against the latest publication. 

Important: Your organization might have security policies that prevent using the internet from the IATA Reader or related executables. Manual (offline) update might be required in that case.

Important: new IATA Reader publications may not work in old versions of the IATA Reader application. The release of publications requiring more advanced functionality will be accompanied with the release of an update to the IATA Reader application. It is therefore very important to allow the IATA Reader to update itself or to regularly check for updates manually.

Important: The IATA Reader update mechanism is NOT used to deliver updates to publications (content). Please see "PUBLICATION UPDATE" section.

Characteristics:
- Automatic update and manual online update require an internet connection
- The IATA Reader must be running for automatic update to happen
- Automatic update checks are triggered every 30 days by default

Updates can be checked and applied in the following ways:
- Automatic online updates
- Manual online updates
- Offline updates

The application automatic check for updates can be enabled or disabled using the "Auto-update" check box in the Management tab of the backstage area. The frequency of the checks can be changed in that location as well.
Note that disabling auto-update only disables the automatic check for updates. Updates can still be checked and applied manually.

Updates can also be manually checked and applied online using the "Check for updates online" buttons in the Management tab of the backstage area. 

If you receive the error "The installed version of the application could not be determined" during the update, it may be indicative that you are applying the update from a Windows account that does not have access to the original installation parameters. To fix that error, make sure you are applying the update using the same Windows account from which the software was originally installed.

Firewall information
The updates are performed using the proxy settings of Internet Explorer. HTTP and standard port 80 are used. The executable "wyUpdate.exe" is used to perform the updates and may need to be added to the list of approved applications in security suites and firewalls.

The following sites may be reached during an update: 
-   www.iata.org
-   cargo-download.iata.org
-   pubdownload.iata.org
-   http://wyUpdate.googlecode.com
-   http://wyday.com

Offline update

Updates can be applied offline if automatic or manual, online updating does not work. The offline update process is started using the "Update offline..." button in the Management tab of the backstage area. That button starts the Offline Update wizard that will guide you through the update process.

Verify and download available update packages from pubdownload.iata.org, from a computer with internet access. That package needs to be made available to the computer requiring updates. The offline update wizard will read the package and apply the update.


PUBLICATION UPDATE
------------------

Publications **will not** be updated through the IATA Reader update mechanism. Publications can be updated by downloading an updated document and opening that document in the Reader. The Reader will automatically update the publication files.

The Reader will notify that an update for a publication is available by showing a green circle with an upright arrow at the bottom right of the publication's tile.

There are three ways to update a publication:
1. Click the "Update available" icon (green circle with an upright arrow) on the document tile.
   A window will open with update information. Click the "Download and install..." button to let the Reader do the update automatically. Note that the publication will need to be closed, if it's opened, before proceeding. Internet is required as the updated document needs to be downloaded.
2. Open a publication for viewing.
   If an update is available you will be prompted to update every time you try to view the publication. Internet is required.
3. Download an updated document manually.
   From your browser, navigate to pubdownload.iata.org. Click the IATA Reader tab on the left and follow instructions to download an updated document.
   Open that updated document in the Reader. The Reader will automatically copy the updated files over the installed ones.

Important: Your organization might have security policies that prevent using the internet from the IATA Reader or related executables. Manual update of publications might be required in that case.


LIBRARY CONFIGURATION FILE
--------------------------

The IATA Reader relies on an XML file containing the latest information about publications and is used to display up-to-date publication information in the Library. In particular, the file contains the information used to display warnings about updates to publications.

There are three ways to download the Library file:
1. Automatically.
   By default, the Library file is downloaded automatically each time the IATA Reader is started, unless disabled - see below.
   The file is downloaded from pubdownload.iata.org.
2. Manually online.
   The Library file can be manually downloaded from the Management tab of the backstage area.
3. Manually, from a browser.
   The Library file can also be manually downloaded from a browser and copied to the location specified below. Type the following URL in your browser to download the library file:
   https://cargo-download.iata.org/reader/1.0.0.0/library/LibraryList.xml.
   Copy the file to "C:\Users\{YOURUSERNAME}\AppData\Local\IATA\Reader\1.0.0.0\Library". You can also copy/paste the content in the file already present in that folder.

Important: Your organization might have security policies that prevent using the internet from the IATA Reader or related executables. Manual download of the Library file might be required in that case.

The download of the Library file can be disabled by making the file read only. To do so, locate the "LibraryList.xml" file in the users folder, as mentioned in point 3 above. Right-click on the file and select Properties. Click the "Read Only" checkbox.

WARNING: Disabling the download of the Library XML file will prevent reception of information related to availability of publication updates and of new editions.


PROXY SUPPORT
-------------
The IATA Reader application can use network proxy parameters for network communication. If you experience problems with downloads, online activation or online updates you may need to configure the application to use proxy parameters. Consult with your network authorities to validate if your network requires proxy to access the internet.
The proxy parameters are coded in a file named "config.ini" that must reside in the Reader's installation folder. That file is a simple text file and does not exist by default. The file is typically managed through the Management tab of the backstage area of the IATA Reader.
The following parameters must be added to the config.ini file and filled in according to your network specifications:

[proxy]
username=
password=
host=
port=
domain=
complete=

Note 1: Only the "host" parameter is mandatory. If omitted the proxy parameters will NOT be used.

Note 2: Use the "complete" parameter if the other parameters cannot be encoded to satisfaction. The "complete" parameter, if present and non-empty, takes precedence and is used "as is" by the activation process. The auto-update process **will not** use the "complete" parameter. The format is "http://username:password@host:port/".

Note 3: If the proxy parameters are added manually, the application will automatically write the parameters back, encrypted, for security reasons. Credentials such as these are not allowed to remain in clear in the config file.

Note 4: Read/write access to the installation folder is required to save information to the config.ini file.


PRODUCT SUPPORT
---------------

For software technical support please contact IATA Product Support, indicating "IATA Reader v1.0' in the subject field.

E-mail: pubsupport@iata.org

Visit pubdownload.iata.org for manual activation, manual deactivation, to download the IATA Reader installer or to download purchased IATA Reader documents.


IATA ONLINE
-----------

Find out more about the International Air Transport Association online at:

www.iata.org

Visit the IATA online store at:

www.iataonline.com


NOTES
-----

Microsoft, Windows, Windows XP, Windows Vista, Windows 7, Windows 8 and Windows 10 are either registered trademarks or trademarks of Microsoft Corporation in the United States and/or other countries.


-- End of Document --
