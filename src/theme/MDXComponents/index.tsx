import type {ComponentProps} from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import ClickableImage from '@site/src/components/ClickableImage';

function DocumentLink(props: ComponentProps<'a'>) {
  // A native download link avoids Docusaurus treating the FBX as a page
  // and appending a trailing slash to its generated asset URL.
  if (props.href && /\/Shisha_Reference(?:-[a-f0-9]+)?\.fbx\/?$/.test(props.href)) {
    return <a {...props} href={props.href.replace(/\/$/, '')} download="Shisha_Reference.fbx" />;
  }
  return <MDXComponents.a {...props} />;
}

export default {...MDXComponents, img: ClickableImage, a: DocumentLink};
