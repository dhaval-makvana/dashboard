export const sortAlphabetically = (arr, key) => {
	if (!key) {
		// assume array of strings;
		return arr.sort();
	}
  return arr.sort((a, b) => {
		if(a[key] < b[key]){
			return -1;
		}else if(a[key] > b[key]){
			return 1;
		}else{
			return 0;
		}
  })
}

export const sortNumerically = (arr, key) => {
	if (!key) {
		return arr.sort((a, b) => a - b);
	}
	return arr.sort((a, b) => a[key] - b[key]);
}