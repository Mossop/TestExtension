function GetDirectoryFromURI(uri)
{
	var rdfservice = Components.classes["@mozilla.org/rdf/rdf-service;1"].getService(Components.interfaces.nsIRDFService);
	var directory = rdfservice.GetResource(uri).QueryInterface(Components.interfaces.nsIAbDirectory);
	return directory;
}

function walkFolder(folder)
{
	//alert(folder.name);
	if (folder.name=="Inbox")
	{
		var msgdb = folder.getMsgDatabase(null);
		var messages = msgdb.EnumerateMessages();
		while (messages.hasMoreElements())
		{
			var message = messages.getNext().QueryInterface(Components.interfaces.nsIMsgDBHdr);
			alert(message.subject);
		}
	}
	else if (folder.hasSubFolders)
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
	
	/*var mailmanager = Components.classes["@mozilla.org/messenger/account-manager;1"].getService(Components.interfaces.nsIMsgAccountManager);
	var count = mailmanager.accounts.Count();
	for (var i = 0; i<count; i++)
	{
		var account=mailmanager.accounts.GetElementAt(i).QueryInterface(Components.interfaces.nsIMsgAccount);
		if (account.incomingServer.type=="imap")
		{
			walkFolder(account.incomingServer.rootFolder);
		}
	}*/
	
	var source = Components.classes["@mozilla.org/rdf/datasource;1?name=composite-datasource"].createInstance(Components.interfaces.nsIRDFCompositeDataSource);
	var rdfservice = Components.classes["@mozilla.org/rdf/rdf-service;1"].getService(Components.interfaces.nsIRDFService);
	var root = rdfservice.GetResource("imap://dave@mail.blueprintit.co.uk/INBOX");
	var acctsource = rdfservice.GetDataSource("rdf:msgaccountmanager");
	var foldersource = rdfservice.GetDataSource("rdf:mailnewsfolders");
	source.AddDataSource(acctsource);
	source.AddDataSource(foldersource);
	if (root instanceof Components.interfaces.nsIMsgFolder)
	{
		alert("MsgFolder");
	}
}
