/**
 * @class
 * @extends {next2d.fw.Context}
 */
export class RedButtonContent extends next2d.fw.Content
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
        return "RedButton";
    }

    /**
     * @return {string}
     */
    get contentName ()
    {
        return "MaterialContent";
    }
}