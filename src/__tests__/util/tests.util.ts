export class TestsUtil {
  private static DICTIONARY = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  private static DICTIONARY_SIZE = TestsUtil.DICTIONARY.length;

  static anyString(length = 6) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += this.DICTIONARY.charAt(Math.floor(Math.random() * this.DICTIONARY_SIZE));
    }
    return result;
  }

  static anyNumber(length = 6) {
    return Math.floor(Math.random() * length);
  }
}
