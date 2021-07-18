/**
 * 
 * @param {[]} array 
 */
function firstOrDefault(array){
        if(!array)
          return null;

        return array.length >0 ?array[0] :null;
    
}

/**
 * 
 * 
 * @param {[]} array 
 */
function lastOrDefault(array){
    if(!array)
      return null;

    return array.length >0 ?array[array.length-1] :null;

}

function findFirst(array,matcher){
    if(!array)
      return null;

    let result = array.filter(x=>matcher(x));
    return result.length>0 ? result[0] : null;

}

function findLast(array,matcher){
    if(!array)
      return null;

    let result = array.reverse().filter(x=>matcher(x));
    return result.length>0 ? result[0] : null;

}

export default {
    firstOrDefault,
    lastOrDefault,
    findFirst,
    findLast
}