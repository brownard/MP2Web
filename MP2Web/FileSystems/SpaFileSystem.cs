using Microsoft.Owin.FileSystems;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MP2Web.FileSystems
{
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
