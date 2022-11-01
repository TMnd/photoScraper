import { AnimalData } from "../pages/Search/Interface";

/**
 * Normalize the result of the multiple APIS into one structure
 * @param inputData 
 * @returns 
 */
export function normalizeResultFromDiffApis(inputData:any) {
    let output = []
    let data=inputData;
    
    if(inputData.message){
        data=inputData.message;
    }

    console.log(data);

    //cat api
    if(data instanceof Array){
        for(let element of data){
            
            let animalData:AnimalData ={
                name:element.name,
                id: element.id
            }

            output.push(animalData);
        }
        return output;
    }

    //dog api
    for (const [key] of Object.entries(data)) {
        const name = key.replace(":","");
        
        let animalData:AnimalData ={
            name:name
        }

        output.push(animalData)
    }

    return output;
}

/**
 * Get the id from the name of the breed of animal.
 * If the id exits returns the id, otherwise returns the value of the query.
 * @param inputList 
 * @param query 
 * @returns 
 */
export function getCodeFromNameIfExists(inputList: Array<AnimalData>, query:string){
    let output: string = query;

    for(let animal of inputList){

        let animalName = animal.name.toLowerCase();
        if(animal.id == null) { //It means in the structure of the list, all ids are null.
            break;
        };
        if(animalName === query){
            output = animal.id;
            break;
        }
    }

    return output;
}