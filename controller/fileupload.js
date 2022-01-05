const{google}=require('googleapis');
const stream=require('stream');
const path =require('path');
const fs = require('fs');


const Client_ID='859572158752-9o0fej694da89iogmvm0o4cdv9le7jfs.apps.googleusercontent.com';
const Client_Serect ='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';
const Redirect_URI='https://developers.google.com/oauthplayground';

const Refresh_Token='1//04I8Ut0EFbBUUCgYIARAAGAQSNwF-L9IrHGuS3O0XTLmwVSG9TBTpqeRFod_XVaIElQ9eOEdelrClYYRzpbayfBBR5K1HgZm9mAM';

const oauth2client =new google.auth.OAuth2(
	Client_ID,
	Client_Serect,
	Redirect_URI
);


oauth2client.setCredentials({refresh_token: Refresh_Token})

const drive =google.drive({ 
	version: 'v3',
	auth: oauth2client
})




var fileId='';
exports.fileUpload= async(req, res) => {
	try{    
		if(!req.file) {
            res.send({
                status: false,
                message: 'No file uploaded'
			}); 
			res.status(500).json({ // 500: Internal Server Error
				msg: "err",
				token: req.token
			});
        }
        //console.log(req.file);
        const { foo } = req.file;
        //console.log(req.file.mimetype);
        let file = req.file;
        //console.log(file.file.path);
       	//uploadFile(file);

		let bufferStream=new stream.PassThrough();
		bufferStream.end(file.buffer);
		const response =await drive.files.create({
			requestBody:{
				name:file.originalname,
				mimeType: file.mimetype,
			},
			media:{
				mimeType:file.mimetype,
				body:bufferStream,
			},
		});
		//console.log(response.data.id);
		fileId=response.data.id;

		await drive.permissions.create({
			fileId:fileId,
			requestBody:{
				role: 'reader',
				type: 'anyone'
			}
		});
		//contentLink 是下載
		const result = await drive.files.get({
			fileId:fileId,
			fields:'webViewLink, webContentLink',
		});
		//console.log(result.data.webViewLink);
		let url=result.data.webViewLink;

       	res.status(201).json({	// 201: Create
			msg: "The file has been upload!",
			token: req.token
		});
    }catch (err){
        res.status(500).json({	// 500: Internal Server Error
			msg:"err",
			token: req.token
		});
    } 


}
// function uploadFile(file){
// 	let bufferStream=new stream.PassThrough();
// 	bufferStream.end(file.buffer);
// 		const response =await drive.files.create({
// 			requestBody:{
// 				name:file.originalname,
// 				mimeType: file.mimetype,
// 			},
// 			media:{
// 				mimeType:file.mimetype,
// 				body:bufferStream,
// 			},
// 		});
// 		console.log(response.data.id);
// 		fileId=response.data.id;
// }

//uploadFile();

// async function deleteFile(){
// 	try{
// 		const response =await drive.files.delete({
// 			fileId:'',
// 		});
// 		console.log(reponse.data,response.status);
// 	}catch(err){
// 		console.log(err.message);
// 	}
// }

// deleteFile();

// async function genratePublicUrl(){
// 	try{
// 		fileId='1-Tckhd2H0-bLcKGX84wqbRGNv7lNa_Mr'
// 		await drive.permissions.create({
// 			fileId:'1-Tckhd2H0-bLcKGX84wqbRGNv7lNa_Mr',
// 			requestBody:{
// 				role: 'reader',
// 				type: 'anyone'
// 			}
// 		});
// 		//contentLink 是下載
// 		const result = await drive.files.get({
// 			fileId:fileId,
// 			fields:'webViewLink, webContentLink',
// 		});
// 		console.log(result.data);
// 	}catch(err){
// 		console.log(err.message);
// 	}
// }
//genratePublicUrl();