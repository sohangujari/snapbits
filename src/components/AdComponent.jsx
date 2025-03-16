import { useEffect, useRef } from 'react';

const AdComponent = () => {
  const adRef = useRef(null);
  const adId = useRef(`ad-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (adRef.current && !adRef.current.hasAttribute('data-ad-rendered')) {
      try {
        // Mark this instance as being rendered
        adRef.current.setAttribute('data-ad-rendered', 'true');
        
        // Only push if not already initialized
        if (window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      } catch (error) {
        console.error('Error loading AdSense:', error);
      }
    }
  }, []);

  return (
    <div className="ad-wrapper" style={{ margin: '10px 0' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        id={adId.current}
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