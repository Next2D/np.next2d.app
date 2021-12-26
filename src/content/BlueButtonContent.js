/**
 * @class
 * @extends {next2d.fw.Context}
 */
export class BlueButtonContent extends next2d.fw.Content
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
        return "BlueButton";
    }

    /**
     * @return {string}
     */
    get contentName ()
    {
        return "MaterialContent";
    }
}