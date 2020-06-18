using MediaPortal.Common;
using MediaPortal.Common.Logging;
using Microsoft.Owin;
using Microsoft.Owin.StaticFiles;
using MP2Web.FileSystems;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace MP2Web.Middleware
{
  /// <summary>
  /// Middleware that serves static files for a single page application
  /// and returns a default file if the path points to a directory
  /// </summary>
  public class MP2WebMiddleware : OwinMiddleware
  {
    protected DefaultFilesMiddleware _defaultFilesMiddleware;
    protected StaticFileMiddleware _staticFileMiddleware;
    protected SendFileMiddleware _sendFileMiddleware;

    public MP2WebMiddleware(OwinMiddleware next) : base(next)
    {
      // Serve files from <Plugins>\MP2Web\ClientApp. StaticFileMiddleware will throw
      // if this directory doesn't exist, so log if this is the case and return.
      string path = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "ClientApp");
      if (!Directory.Exists(path))
      {
        ServiceRegistration.Get<ILogger>().Error("MP2WebMiddleware: Unable to create StaticFileMiddleware, the directory '{0}' does not exist", path);
        return;
      }

      var staticFileOptions = new StaticFileOptions
      {
        FileSystem = new SpaFileSystem(Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"ClientApp"), "index.html"),
        RequestPath = new PathString("/MP2Web"),
        ServeUnknownFileTypes = true,
      };

      _staticFileMiddleware = new StaticFileMiddleware(e => next.Invoke(new OwinContext(e)), staticFileOptions);

      _defaultFilesMiddleware = new DefaultFilesMiddleware(_staticFileMiddleware.Invoke, new DefaultFilesOptions
      {
        FileSystem = staticFileOptions.FileSystem,
        RequestPath = staticFileOptions.RequestPath
      });
    }

    public override Task Invoke(IOwinContext context)
    {
      // _defaultFilesMiddleware will be null if the ClientApp directory didn't exist
      // during startup, simply pass the request along in this case
      return _defaultFilesMiddleware != null ? 
        _defaultFilesMiddleware.Invoke(context.Environment) : Next.Invoke(context);
    }
  }
}
