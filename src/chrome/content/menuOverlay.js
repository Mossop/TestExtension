function GetDirectoryFromURI(uri)
{
	var rdfservice = Components.classes["@mozilla.org/rdf/rdf-service;1"]. getService(Components.interfaces.nsIRDFService);
	var directory = rdfservice.GetResource(uri).QueryInterface(Components.interfaces.nsIAbDirectory);
	return directory;
}

function testscript()
{
	var en = GetDirectoryFromURI("moz-abmdbdirectory://abook.mab").childCards;
	en.first();
	alert((en.currentItem().QueryInterface(Components.interfaces.nsIAbCard)).displayName+"\n");
}
