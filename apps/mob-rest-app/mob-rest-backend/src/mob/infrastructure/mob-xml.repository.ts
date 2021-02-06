import { Injectable } from '@nestjs/common';
import {MobRepository} from "../domain/mob.repository";
import {Book} from "../../shared/objects/domain/book";

@Injectable()
export class MobXmlRepository implements MobRepository{

	constructor(){}

	private async extractElementsFromObjectAndPushIndividuallyToArray(object){
		var nestob = require('nestob');
    	let extractedElementsAndAtributes = []
    	let firstExtraction = Object.entries(object)
    	extractedElementsAndAtributes.push(firstExtraction[0][0])
		let secondExtraction = Object.entries(firstExtraction[0][1])
		for (let elementArray of secondExtraction){
			for(let individualElement of elementArray){
				extractedElementsAndAtributes.push(individualElement)
			}
		}

        let formattedObject = {}
        let PairElementCount=0
        while(extractedElementsAndAtributes.length-1!=PairElementCount){
        	nestob.setNested(formattedObject, extractedElementsAndAtributes[PairElementCount+1],extractedElementsAndAtributes[PairElementCount+2]);
        	PairElementCount+=2
        }

        return [formattedObject,extractedElementsAndAtributes[0]]
	}

	private async JSONIntoXML(json){
		let json2xml = require('xml-js').json2xml;
	    var optionsjson = {compact: true, ignoreComment: true, spaces: 4};
		var resultxml = json2xml(json, optionsjson);
		return resultxml
	}

	private async writeXMLFile(resultxml){
		let fs = require('fs');
		fs.writeFile('./templates/backend-template.xml', resultxml, function(err, data) {
			return !err;
		});
	}
	
	async parseXml(xml) {
		const parseString = require('xml2js').parseString;
	    return new Promise((resolve, reject) => {
	        parseString(xml, (err, result) => {
	            if (err) {
	                reject(err);
	            } else {
	                resolve(result);
	            }
	        });
	    });
	}

	async testXmlParse(xml) {
	    try {
	        return await this.parseXml(xml);
	    } catch (err) {
	        console.error("parseXml failed: ", err);
	    }
	}

	async readFs() {
		let fs = require('fs');
	    return new Promise((resolve, reject) => {
            fs.readFile('./templates/backend-template.xml', function(err, result) {			
        	    if (err) {
	                reject(err);
	            } else {
	                resolve(result);
	            }
        	});
	    });	    
	}

	async testReadFs() {
	    try {	        	       
	        return this.testXmlParse(await this.readFs())
	    } catch (err) {
	        console.error("parseXml failed: ", err);
	    }
	}

	async writeFs(resultxml) {
		let fs = require('fs');
	    return new Promise((resolve, reject) => {            
    		fs.writeFile('./templates/backend-template.xml', resultxml, function(err, data) {
    		    if (err) {
    		    	reject(err);
    		    }
    		    else {
	            	resolve(true);    		      
    		    }
    		});
	    });	    
	}


	async testWriteFs(editableJSON){
		try {
			let result2 = await this.testJSONtoXML(editableJSON)
			console.log(result2)
		    return await this.writeFs(result2)
		} catch (err) {
		    console.error("parseXml failed: ", err);
		}	
	}

	public JSONtoXML(editableJSON) {
		let fs = require('fs');	    
		var stringified = JSON.stringify(editableJSON);
		let json2xml = require('xml-js').json2xml;
	    var optionsjson = {compact: true, ignoreComment: true, spaces: 4};
		return json2xml(stringified, optionsjson);	    
	}


	async testJSONtoXML(editableJSON){
		try {	        	       
		    return this.JSONtoXML(editableJSON)
		} catch (err) {
		    console.error("parseXml failed: ", err);
		}	
	}

	public async createObject(book: Book) {
		let formattedObject; let firstElement;
		var nestob = require('nestob');		
		[formattedObject,firstElement] = await this.extractElementsFromObjectAndPushIndividuallyToArray(book);
		let editableJSON:any = await this.testReadFs();
		nestob.setNested(editableJSON.objects, firstElement,formattedObject);
		return await this.testWriteFs(editableJSON)
	}

	public async deleteObject(id){				
		let editableJSON:any = await this.testReadFs();	    	
    	if(editableJSON.objects[id]){
    		delete editableJSON.objects[id]
    	}
    	return await this.testWriteFs(editableJSON)
	}


	public async findObject(id){
		let editableJSON:any = await this.testReadFs();
		if(editableJSON.objects[id]){
			return editableJSON.objects[id]
		}
		return []
	}

	public async updateObject(id,object){
		//return await this.repository.update(id,object);
	}

	public async replicateObject(){
		//replicamos a los otros dos servidores (mandamos pa que guarden)
		//agarra el xml, pasalo a json, mandalo a los otros servidores
		//espera las respuestas
	}

	public async restoreObject(){
		//preguntamos la info vieja
		//consulta a los otros servidores
		//espera la respuesta
		//guarda
	}
}
