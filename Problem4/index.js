
//Conplexity: O(n)
var sum_to_n_a = function(n) {
    let result = 0;
    for( let i = 1; i <= n ; i++) {
        result += i;
    }
    return result;
};

//Conplexity: O(n)
var sum_to_n_b = function(n) {
    if(n < 1)
        return 0;
    return n + sum_to_n_b(n - 1);
};

//Conplexity: O(1)
var sum_to_n_c = function(n) {
    return n * (n + 1) / 2
};


console.log(sum_to_n_a(15));
console.log(sum_to_n_b(15));
console.log(sum_to_n_c(15));