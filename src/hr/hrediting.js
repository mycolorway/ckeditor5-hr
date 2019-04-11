/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module pdf/pdf
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toHRWidget } from './utils';

import HRInsertCommand from './hrinsertcommand';

export default class HREditing extends Plugin {
	init() {
		const { editor } = this;
		const { conversion, model, t } = editor;
		const { schema } = model;

		schema.register( 'hr', {
			isBlock: true,
			isObject: true,
			isLimit: true,
			contentEditable: false,
			allowWhere: '$block'
		} );

		// Add a converter to the data pipepline only:
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'hr',
			view: ( modelElement, viewWriter ) => createHRViewElement( viewWriter )
		} );
		// And a slightly different one for the editing pipeline:
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'hr',
			view: ( modelElement, viewWriter ) => toHRWidget( createHRViewElement( viewWriter ), viewWriter, t( 'HR widget' ) )
		} );

		conversion.for( 'upcast' )
			.elementToElement( {
				view: 'hr',
				model: ( viewHR, modelWriter ) => modelWriter.createElement( 'hr', {} )
			} );

		editor.commands.add( 'HRInsert', new HRInsertCommand( editor ) );
	}
}

export function createHRViewElement( writer ) {
	const hr = writer.createEmptyElement( 'hr' );
	return hr;
}
