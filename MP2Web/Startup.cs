using MediaPortal.Common;
using MediaPortal.Common.PluginManager;
using MediaPortal.Common.Services.ResourceAccess;
using MediaPortal.Common.Services.ResourceAccess.Settings;
using MediaPortal.Common.Settings;
using MediaPortal.Common.SystemResolver;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.Hosting;
using Microsoft.Owin.StaticFiles;
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
      ServerSettings settings = ServiceRegistration.Get<ISettingsManager>().Load<ServerSettings>();
      List<string> filters = settings.IPAddressBindingsList;
      _serverPort = UPnPServer.DEFAULT_UPNP_AND_SERVICE_PORT_NUMBER;
      _servicePrefix = "/MediaPortal/MP2Web";
      var startOptions = UPnPServer.BuildStartOptions(_servicePrefix, filters, _serverPort);

      _httpServer = WebApp.Start(startOptions, builder =>
      {
        // Configure OAuth Authorization Server
        //        builder.UseOAuthAuthorizationServer(new OAuthAuthorizationServerOptions
        //        {
        //          AuthenticationType = MEDIAPORTAL_AUTHENTICATION_TYPE,
        //          TokenEndpointPath = new PathString("/Token"),
        //          ApplicationCanDisplayErrors = true,
        //          AuthorizationCodeExpireTimeSpan = TimeSpan.FromDays(7),
        //#if DEBUG
        //          AllowInsecureHttp = true,
        //#endif
        //          // Authorization server provider which controls the lifecycle of Authorization Server
        //          Provider = new OAuthAuthorizationServerProvider
        //          {
        //            OnValidateClientAuthentication = ValidateClientAuthentication,
        //            OnGrantResourceOwnerCredentials = GrantResourceOwnerCredentials,
        //          }
        //        });
        //        builder.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
                
        // Configure Web API
        HttpConfiguration config = new HttpConfiguration();

        // Support conventional routing
        var routeTemplate = (_servicePrefix + "/api/{controller}/{id}").TrimStart('/'); // No leading slash allowed
        config.Routes.MapHttpRoute(
            "DefaultApi",
            routeTemplate,
            new { id = RouteParameter.Optional }
        );

        // Support attribute based routing
        config.MapHttpAttributeRoutes();

        // Set json as default instead of xml
        config.Formatters.JsonFormatter.MediaTypeMappings
          .Add(new System.Net.Http.Formatting.RequestHeaderMapping(
            "Accept", "text/html", StringComparison.InvariantCultureIgnoreCase, true, "application/json"));

        builder.UseWebApi(config);

        var options = new FileServerOptions();
        options.EnableDirectoryBrowsing = true;
        options.FileSystem = new PhysicalFileSystem(Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"ClientApp"));
        options.StaticFileOptions.ServeUnknownFileTypes = true;
        builder.UseFileServer(options);
      });
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
