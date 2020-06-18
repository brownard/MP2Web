using MediaPortal.Common;
using MediaPortal.Common.PluginManager;
using MediaPortal.Common.ResourceAccess;
using MediaPortal.Common.Services.ResourceAccess;
using MediaPortal.Common.Services.ResourceAccess.Settings;
using MediaPortal.Common.Settings;
using MediaPortal.Common.SystemResolver;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.Hosting;
using Microsoft.Owin.StaticFiles;
using MP2Web.FileSystems;
using MP2Web.Middleware;
using Owin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Web.Hosting;
using System.Web.Http;
using UPnP.Infrastructure.Dv;

namespace MP2Web
{
  public class Startup : IPluginStateTracker
  {
    IDisposable _httpServer;
    protected int _serverPort = UPnPServer.DEFAULT_UPNP_AND_SERVICE_PORT_NUMBER;
    protected readonly object _syncObj = new object();
    protected string _servicePrefix;

    public void Start()
    {
      ServiceRegistration.Get<IResourceServer>().AddHttpModule((typeof(MP2WebMiddleware)));
    }

    public void Stop()
    {
      _httpServer?.Dispose();
      _httpServer = null;
    }

    public void Activated(PluginRuntime pluginRuntime)
    {
      Start();
    }

    public bool RequestEnd()
    {
      return true;
    }

    public void Continue()
    {

    }

    public void Shutdown()
    {
      Stop();
    }
  }
}
