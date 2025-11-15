import type { Struct, Schema } from '@strapi/strapi';

export interface InfoBlockButton extends Struct.ComponentSchema {
  collectionName: 'components_info_block_buttons';
  info: {
    displayName: 'button';
    description: '';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
    color: Schema.Attribute.Enumeration<
      ['turquoise', 'orange', 'brown', 'beige']
    > &
      Schema.Attribute.Required;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'info-block.button': InfoBlockButton;
    }
  }
}
