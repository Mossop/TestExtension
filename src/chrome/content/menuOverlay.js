function GetDirectoryFromURI(uri)
{
	var rdfservice = Components.classes["@mozilla.org/rdf/rdf-service;1"]. getService(Components.interfaces.nsIRDFService);
	var directory = rdfservice.GetResource(uri).QueryInterface(Components.interfaces.nsIAbDirectory);
	return directory;
}

function walkFolder(folder)
{
	alert(folder.name);
	if (folder.hasSubFolders)
	{
		var subs = folder.GetSubFolders();
		subs.first();
		try
		{
			while (true)
			{
				walkFolder(subs.currentItem().QueryInterface(Components.interfaces.nsIMsgFolder));
				subs.next();
			}
		}
		catch (e) {}
	}
}

function testscript()
{
	/*var en = GetDirectoryFromURI("moz-abmdbdirectory://abook.mab").childCards;
	en.first();
	alert((en.currentItem().QueryInterface(Components.interfaces.nsIAbCard)).displayName+"\n");*/
	
	var mailmanager = Components.classes["@mozilla.org/messenger/account-manager;1"].getService(Components.interfaces.nsIMsgAccountManager);
	var count = mailmanager.accounts.Count();
	for (var i = 0; i<count; i++)
	{
		var account=mailmanager.accounts.GetElementAt(i).QueryInterface(Components.interfaces.nsIMsgAccount);
		if (account.incomingServer.type=="imap")
		{
			walkFolder(account.incomingServer.rootFolder);
		}
	}
}
