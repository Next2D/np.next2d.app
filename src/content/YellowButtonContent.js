/**
 * @class
 * @extends {next2d.fw.Context}
 */
export class YellowButtonContent extends next2d.fw.Content
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
        return "YellowButton";
    }

    /**
     * @return {string}
     */
    get contentName ()
    {
        return "MaterialContent";
    }
}