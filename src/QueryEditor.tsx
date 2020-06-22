import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './DataSource';
import { defaultQuery, VerticaDataSourceOptions, VerticaQuery } from './types';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-sql';

type Props = QueryEditorProps<DataSource, VerticaQuery, VerticaDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  onQueryTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, rawSql: event.target.value });
  };

  _onQueryTextChange = (event: string) => {
    const { onChange, query } = this.props;
    onChange({ ...query, rawSql: event });
  };

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { rawSql } = query;
    // @ts-ignore
    ace.config.set('basePath', 'public/app/core/components/code_editor/');
    return (
      <div className="gf-form">
        <AceEditor
          theme={'grafana-dark'}
          mode={'sql'}
          onChange={this._onQueryTextChange}
          value={rawSql || ''}
          maxLines={10}
          tabSize={2}
          enableSnippets={true}
          enableBasicAutocompletion={true}
          showGutter={false}
          highlightActiveLine={false}
          showPrintMargin={false}
          className={'gf-code-editor'}
        />
      </div>
    );
  }
}