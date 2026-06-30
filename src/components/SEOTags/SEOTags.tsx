import React from 'react';
import { Helmet } from 'react-helmet-async';
import structuredData from '../../data/structuredData.json';

type Props = {
  title?: string;
  description?: string;
  canonicalLink?: string;
  image?: string;
  noIndex?: boolean;
  author?: string;
  schemaData?: object;
  pageType?: string;
};

const SEOTags = ({
  title,
  description,
  canonicalLink,
  image,
  noIndex = false,
  author,
  schemaData,
  pageType,
}: Props) => {
  const newTitle = title ?? 'BaatChat - Secure Messaging, Voice & Video Calls';
  const newDesc =
    description ??
    'Connect instantly with BaatChat. Enjoy secure messaging, crystal-clear voice and video calls, and seamless conversations across devices.';
  const newImage = import.meta.env.VITE_FED_URL + '/images/' + image;
  const ogUrl = window.location.href;
  if (!schemaData && pageType)
    schemaData = structuredData[pageType as keyof typeof structuredData] ?? structuredData.default;

  return (
    <Helmet>
      <title>{newTitle}</title>
      <meta name="description" content={newDesc} />
      {canonicalLink && <link rel="canonical" href={canonicalLink} />}

      {/* OG (Open Graph ) tags  */}
      <meta property="og:title" content={newTitle ?? ''} />
      <meta property="og:description" content={newDesc} />
      <meta property="og:image" content={newImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />

      {/* Adding these in index.html */}
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="BaatChat" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={newTitle} />
      <meta name="twitter:description" content={newDesc} />
      <meta name="twitter:image" content={newImage} />
      <meta name="twitter:site" content="@sunny8080_" />

      {/* Other meta tags */}
      {author && <meta name="author" content={author} />}

      {/* If you want to index this page */}
      {!noIndex && <meta name="robots" content="index, follow" />}

      {/* If you want to no index this page */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Structured Data */}
      {schemaData && <script type="application/ld+json">{JSON.stringify(schemaData)}</script>}
    </Helmet>
  );
};

export default SEOTags;
