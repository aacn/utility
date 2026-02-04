class FormSanitizer {
  /**
   * Compare the provided form data, with the provided customer opject, to check if data differs from the existing customer object.
   * @param localData The already known data. This object can be a superset of the data object.
   * @param data The form data, that should replace the localData object.
   * @returns {boolean} True if the data differs from the local data.
   */
  public static formHoldsNewData<T>(
    localData: { [key: string]: any },
    data: { [key: string]: T }
  ): boolean {
    // get all keys from new form data object to compare with the old one.
    const formDataKeys = Object.keys(data) as Array<string>;

    // extract data for each key from the new form data object and compare it.
    for (const key of formDataKeys) {
      let formDataValue: T | string = data[key];

      if (formDataValue !== localData[key]) {
        return true;
      }
    }

    return false;
  }
}

export { FormSanitizer };
