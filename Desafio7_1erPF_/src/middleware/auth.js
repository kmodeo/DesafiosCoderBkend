
module.exports = (req, res, next) => {
  try {
        if (req.header('authorization') == process.env.TOKEN){
     
        next();

        } 
        else{
                res.status(401).json({ code: -1, name: 'Access denegado', message: 
               'No se puede acceder a la ruta: '+req.originalUrl });
                 
            }
      }
        
    catch {
            res.status(401).json({
              error: new Error('Invalid request!')
            });
          }
    };
