import _ from 'lodash'

export const methods = {
    getExcerpt: function(post) {
        if (_.isUndefined(post.excerpt.rendered))
          return "";
        return _.truncate(post.excerpt.rendered, {
          length: 120
        });
      },
      getFeaturedImage: function(post) {
        return "";
        if (typeof post.better_featured_image.media_details.sizes.featured == 'undefined')
          return "";
        return post.better_featured_image.media_details.sizes.featured.source_url;
      }
}