function GetDirectoryFromURI(uri)
{
	var rdfservice = Components.classes["@mozilla.org/rdf/rdf-service;1"]. getService(Components.interfaces.nsIRDFService);
	var directory = rdfservice.GetResource(uri).QueryInterface(Components.interfaces.nsIAbDirectory);
	return directory;
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
		alert(account.incomingServer.prettyName);
	}
}
