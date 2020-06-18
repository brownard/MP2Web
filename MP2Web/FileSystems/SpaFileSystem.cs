using Microsoft.Owin.FileSystems;
using System.Collections.Generic;
using System.IO;

namespace MP2Web.FileSystems
{
  /// <summary>
  /// Implementation of <see cref="IFileSystem"/> that falls back to searching the root directory
  /// for a specified path if no matching subpath was found.
  /// </summary>
  /// <remarks>
  /// This is required for single page apps that use url based routing because the urls used for the routes
  /// are not valid paths on the server. Ordinarily, when navigating within the app, this doesn't matter because
  /// the browser doesn't actually follow the urls when changing routes. However if the user refreshes the page
  /// in a route the browser will follow it and attempt to request all subsequent paths relative to it, we fall
  /// back to returning relative to the route path in this case so everything still works correctly.
  /// </remarks>
  public class SpaFileSystem : IFileSystem
  {
    protected string _root;
    protected string _defaultFile;
    protected IFileSystem _baseFileSystem;

    public SpaFileSystem(string root, string defaultFile)
    {
      _root = root;
      _defaultFile = defaultFile;
      _baseFileSystem = new PhysicalFileSystem(root);
    }

    public bool TryGetDirectoryContents(string subpath, out IEnumerable<IFileInfo> contents)
    {
      if (_baseFileSystem.TryGetDirectoryContents(subpath, out contents))
        return true;
      return _baseFileSystem.TryGetDirectoryContents(_root, out contents);
    }

    public bool TryGetFileInfo(string subpath, out IFileInfo fileInfo)
    {
      if (_baseFileSystem.TryGetFileInfo(subpath, out fileInfo))
        return true;
      return _baseFileSystem.TryGetFileInfo(Path.Combine(_root, _defaultFile), out fileInfo);
    }
  }
}
