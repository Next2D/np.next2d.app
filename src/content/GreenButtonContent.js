/**
 * @class
 * @extends {next2d.fw.Context}
 */
export class GreenButtonContent extends next2d.fw.Content
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();
    }

    /**
     * @return {string}
     */
    get namespace ()
    {
        return "GreenButton";
    }

    /**
     * @return {string}
     */
    get contentName ()
    {
        return "MaterialContent";
    }
}