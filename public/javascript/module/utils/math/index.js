const math = {
    sqrt: async (number) =>{
        for (let i = 0; i < number; i++) {
            if(i*i == number){
                return number;
            }
        }
        return -1;
    },
    sqrt: async (number,range) =>{
        if(number <= 0) return -1;
        if(range == 1) return number;
        if(range == 0) return 1;
        
        for (let i = 0; i < number; i++) {
            if(i**range == number){
                return number;
            }
        }
        return -1;
    }
}

export default math;