function TestComponent()
{
};

TestComponent.prototype =
{
	startup: function()
	{
	},
	
	// nsIAbListener implementation
	onItemAdded: function(parent,item)
	{
		dump("Item added:\n");
		dump("  Parent: ");
		dumpInfo(parent);
		dump("  Item: ");
		dumpInfo(item);
	},
	
	onItemPropertyChanged: function(item,property,oldvalue,newvalue)
	{
		dump("Item changed:\n");
		dump("  Item: ");
		dumpInfo(item);
	},
	
	onItemRemoved: function(parent,item)
	{
		dump("Item removed:\n");
		dump("  Parent: ");
		dumpInfo(parent);
		dump("  Item: ");
		dumpInfo(item);
	},
	// End nsIAbListener
	
	// nsIObserver implementation
	observe: function(subject,topic,data)
	{
		if (topic=="app-startup")
		{
			dump("TestComponent app-startup\n");
		}
		else if (topic=="xpcom-startup")
		{
			dump("TestComponent xpcom-startup\n");
		}
		else
		{
			dump("Unknown topic "+topic+" was observer\n");
		}
	},
	// End nsIObserver
	
	// nsISupports implementation
	QueryInterface: function (iid)
	{
		if (!iid.equals(Components.interfaces.nsITest)
			&& !iid.equals(Components.interfaces.nsIObserver)
			&& !iid.equals(Components.interfaces.nsIAbListener)
			&& !iid.equals(Components.interfaces.nsISupports))
		{
			throw Components.results.NS_ERROR_NO_INTERFACE;
		}
		return this;
	}
	// End nsISupports
};

var initModule =
{
	CID: Components.ID("{e4d74ef1-89c1-4e43-97af-741eb5ff89ad}"),
	ProgID: "@blueprintit.co.uk/testComponent;1",

	registerSelf: function (compmgr, filespec, location, type)
	{
		compmgr = compmgr.QueryInterface(Components.interfaces.nsIComponentRegistrar);
		compmgr.registerFactoryLocation(this.CID,"Test Component",this.ProgID,filespec,location,type);
		var catman = Components.classes["@mozilla.org/categorymanager;1"].getService(Components.interfaces.nsICategoryManager);
		//catman.addCategoryEntry("app-startup","Test Component",this.ProgID,true,true);
		//catman.addCategoryEntry("xpcom-startup","Test Component",this.ProgID,true,true);
	},
	
	unregisterSelf: function(compmgr, filespec, location)
	{
		compmgr = compmgr.QueryInterface(Components.interfaces.nsIComponentRegistrar);
		compmgr.unregisterFactoryLocation(this.CID,filespec);		
		var catman = Components.classes["@mozilla.org/categorymanager;1"].getService(Components.interfaces.nsICategoryManager);
		//catman.deleteCategoryEntry("app-startup","Test Component",true);
		//catman.deleteCategoryEntry("xpcom-startup","Test Component",true);
	},

	getClassObject : function (compMgr, cid, iid)
	{
		if (!cid.equals(this.CID))
			throw Components.results.NS_ERROR_NO_INTERFACE
		if (!iid.equals(Components.interfaces.nsIFactory))
			throw Components.results.NS_ERROR_NOT_IMPLEMENTED;
		return this.classFactory;
	},

	classFactory:
	{
		createInstance: function (outer, iid)
		{
			if (outer != null)
				throw Components.results.NS_ERROR_NO_AGGREGATION;
			return (new TestComponent()).QueryInterface(iid);
		}
	},

	canUnload: function(compMgr)
	{
		return true;
	}
};

function NSGetModule(compMgr, fileSpec)
{
	return initModule;
}
