import { showMessage } from 'react-native-flash-message';
import Colors from './colors';
import Constants from './constants';
const aspectRatio = Constants.Ratio.Height / Constants.Ratio.Width;

// common method file
export const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const strReplace = (str) => {
    return (str && str.replace(/["']/g, ""))
}

export const isTabletBasedOnRatio = () => {
    if (aspectRatio > 1.6) {
        return false;
    } else {
        return true;
    }
}

export const handleErrMsg = (res: any) => {
  let error;
  if (Array.isArray(res?.errors)) {
    error = res?.errors[0];
  } else if (typeof res?.errors == 'string') {
    error = res?.errors;
  } else {
    error = res?.message;
  }
  return error;
};

/** API / axios throws plain object — toast ke liye ek string */
export const formatApiError = (error: unknown): string => {
  if (error == null) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (typeof error === 'object') {
    const e = error as Record<string, unknown>;
    const parts = [e.message, e.details, e.hint, e.code]
      .filter(Boolean)
      .map(String);
    if (parts.length) {
      return parts.join(' — ');
    }
  }
  return String(error);
};

export const showToast = (
  title: string = 'Error!',
  message: string,
  type: string = 'error',
) => {
  const flashType =
    type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'danger';
  showMessage({
    message: title,
    description: message,
    type: flashType,
    backgroundColor:
      flashType === 'success' ? Colors.green : flashType === 'warning' ? Colors.warning : Colors.red,
    duration: 4000,
    icon: {
      icon: flashType === 'success' ? 'success' : 'danger',
      position: 'left',
      style: { marginTop: 2 },
    },
  });
};