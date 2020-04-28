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
  public class MP2WebMiddleware : OwinMiddleware
  {
    protected DefaultFilesMiddleware _defaultFilesMiddleware;
    protected StaticFileMiddleware _staticFileMiddleware;
    protected SendFileMiddleware _sendFileMiddleware;

    public MP2WebMiddleware(OwinMiddleware next) : base(next)
    {
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
      return _defaultFilesMiddleware.Invoke(context.Environment);
    }
  }
}
