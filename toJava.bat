@echo off
del /s /q c:\Workspace\code\java\jwt-sec-auth\target\static
del /s /q c:\Workspace\code\java\jwt-sec-auth\static
cls
echo ---------    Angular build    -------------------------------------------------------------------------
call ng build
echo ---------  Copy to Java project   ---------------------------------------------------------------------
@echo off
echo ---------       copy to java static      --------------------------------------------------------------
xcopy /q /e /y c:\Workspace\code\angular\ng-bts\dist\ng-bts c:\Workspace\code\java\jwt-sec-auth\static
rem echo ---------    copy to java target\static  --------------------------------------------------------------
rem xcopy /q /e /y c:\Workspace\code\angular\ng-bts\dist\ng-bts c:\Workspace\code\java\jwt-sec-auth\target\static
echo --------- End copy ------------------------------------------------------------------------------------
