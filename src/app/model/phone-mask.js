import { PHONE_MASK } from '../../shared/lib/constants/constants';
import Inputmask from 'inputmask';

export function phoneMask() {
  const phoneInputs = document.getElementById('phone');
  const im = new Inputmask(PHONE_MASK);
  im.mask(phoneInputs);
}
