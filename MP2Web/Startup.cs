using MediaPortal.Common;
using MediaPortal.Common.PluginManager;
using MediaPortal.Common.ResourceAccess;
using MP2Web.Middleware;

namespace MP2Web
{
  public class Startup : IPluginStateTracker
  {
    public void Activated(PluginRuntime pluginRuntime)
    {
      ServiceRegistration.Get<IResourceServer>().AddHttpModule((typeof(MP2WebMiddleware)));
    }

    public void Continue()
    {
    }

    public bool RequestEnd()
    {
      return true;
    }

    public void Shutdown()
    {
    }

    public void Stop()
    {
    }
  }
}
