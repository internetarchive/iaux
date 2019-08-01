// const debug = require('debug')('dweb-archive:Download');
import React from 'react';
import IAReactComponent from '../IAReactComponent';
import AnchorDetails from '../AnchorDetails';
import { AnchorDownload } from './AnchorDownload';

class DownloadDirectoryDiv extends IAReactComponent {
  /**
   * <Download
   *    identifier: identifier of collection, undefined for searches
   *    files: [{name, size}*]
   * />
   *
   * Renders a directory with name and pretty size
   * TODO needs date in form probably like new Date().toLocaleDateString('en-GB',{day:'numeric', month:'short', year:'numeric',hour:'2-digit',minute:'2-digit'})
   * See https://github.com/internetarchive/dweb-archive/issues/10 for discussion - this is NOT complete yet, but works enough to use.
   */

  render() {
    return (
      <div className="container container-ia">
        <div className="download-directory-listing">
          <h1>Files for {this.props.identifier}</h1>
          <hr/>
          <pre>
            <table className="directory-listing-table">
              <thead><th>Name</th>
              {/*--<th>Last modified</th>--*/}
              <th>Size</th></thead>
              <tbody>
                <tr>
                  <td><AnchorDetails identifier={this.props.identifier}><span className="iconochive-Uplevel"
                                                                              title="Parent Directory"
                                                                              aria-hidden="true"></span> Go to item page</AnchorDetails></td>
                  <td></td>
                  <td></td>
                </tr>
                {this.props.files.map(f => (
                  <tr>
                    <td><AnchorDownload source={f}
                                        title={f.name}
                                        disconnected={this.props.disconnected}><span
                      className="sr-only">download</span>{f.name}</AnchorDownload></td>
                    {/*--TODO-DIR handle directory here as foo/ --*/}
                    {/*--<td>00-Apr-0000 00:00{--TODO-DIR handle date from mtime </td>--*/}
                    <td>{f.size}{/*--TODO-DIR should be "-" for directory--*/}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </pre>
        </div>
      </div>
    )
  }
}
export {DownloadDirectoryDiv}