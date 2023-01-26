@echo off
cls
echo ---------    Angular build    -------------------------------------------------------------------------
call ng build
echo ---------  Copy to Java project   ---------------------------------------------------------------------
@echo off
del /s /q c:\Workspace\code\java\jwt-sec-auth\target\static\*.*
del /s /q c:\Workspace\code\java\jwt-sec-auth\static\*.*
echo ---------       copy to java static      --------------------------------------------------------------
xcopy /q /e /y c:\Workspace\code\angular\ng-bts\dist\ng-bts c:\Workspace\code\java\jwt-sec-auth\static
echo ---------    copy to java target\static  --------------------------------------------------------------
xcopy /q /e /y c:\Workspace\code\angular\ng-bts\dist\ng-bts c:\Workspace\code\java\jwt-sec-auth\target\static
echo --------- End copy ------------------------------------------------------------------------------------
