import * as React from 'react';
import PropTypes from 'prop-types';

export const LocalTimeOffset = ({offsetSeconds}) => {
  const [, setSeconds] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <>{new Date(Date.parse((new Date()).toUTCString()) + offsetSeconds).toLocaleTimeString()}</>;
};

LocalTimeOffset.propTypes = {
  offsetSeconds: PropTypes.number.isRequired,
};
LocalTimeOffset.displayName = 'LocalTimeOffset';


