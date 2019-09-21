// const debug = require('debug')('dweb-archive:Download');
import React from 'react';
import IAReactComponent from '../IAReactComponent';
import AnchorDetails from '../AnchorDetails';
import { AnchorDownload, reachable } from './AnchorDownload';
import { I8nSpan, I8nStr } from "../../../../../dweb-archive/components/Languages";

class DownloadDirectoryDiv extends IAReactComponent {
  /**
   * <Download
   *    identifier: identifier of collection, undefined for searches
   *    files: [{name, size}*]
   *    disconnected: BOOL      True when cannot reach archive
   * />
   *
   * Renders a directory with name and pretty size
   * if downloaded=false then only displays files in list
   * TODO needs date in form probably like new Date().toLocaleDateString('en-GB',{day:'numeric', month:'short', year:'numeric',hour:'2-digit',minute:'2-digit'})
   * See https://github.com/internetarchive/dweb-archive/issues/10 for discussion - this is NOT complete yet, but works enough to use.
   * https://github.com/internetarchive/dweb-archivecontroller/issues/8 for better algirithm for reachable, and probably apply at ArchiveItem level when getting list
   */

  render() {
    return (
      <div className="container container-ia">
        <div className="download-directory-listing">
          <h1><I8nSpan en="Files for"/> {this.props.identifier}</h1>
          <hr/>
          <pre>
            <table className="directory-listing-table">
              <thead><tr><th><I8nSpan en="Name"/></th>
              {/*--<th>Last modified</th>--*/}
              <th>Size</th></tr></thead>
              <tbody>
                <tr>
                  <td><AnchorDetails identifier={this.props.identifier}><span className="iconochive-Uplevel"
                                                                              title={I8nStr("Parent Directory")}
                                                                              aria-hidden="true"></span> <I8nSpan en="Go to item page"/></AnchorDetails></td>
                  <td></td>
                  <td></td>
                </tr>
                {this.props.files
                  .filter(f => reachable({disconnected: this.props.disconnected, source: f}))
                  .map(f => (
                    <tr key={f.name}>
                      <td><AnchorDownload source={f}
                                          title={f.name}
                                          disconnected={this.props.disconnected}><I8nSpan
                        className="sr-only" en="download"/>{f.name}</AnchorDownload></td>
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