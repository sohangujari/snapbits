import { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    try {
      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
    } catch (error) {
      console.error('Error loading AdSense:', error);
    }
  }, []);

  return (
    <div className="ad-wrapper" style={{ margin: '10px 0' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-2881097785873625"
        data-ad-slot="4386306876"
      />
    </div>
  );
};

export default AdComponent; 