/**
 * @class
 * @extends {next2d.fw.Model}
 */
export class HomeText extends next2d.fw.Model
{
    /**
     * @return {Promise}
     * @static
     */
    static get ()
    {
        return fetch(`${next2d.fw.config.api.endPoint}api/home.json`)
            .then((responce) =>
            {
                return responce.json();
            })
            .catch((error) =>
            {
                console.error(error);
            });
    }
}