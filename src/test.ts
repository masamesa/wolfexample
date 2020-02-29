import { WolfClient, User, DeviceType } from 'wolfapi-ts';
import { ExtendedMessage, ExtendedGroup, ExtendedUser, Message, CGroup } from 'wolfapi-ts';
import { Plugin } from 'wolfapi-ts';
class Main{
    public bot: WolfClient;


    @Plugin('testplugin', {
        aliases: ['tp'],
        groupOnly: false,
        pmOnly: false,
        description: "Hey this is a test plugin.",
    })
    static async Testplugin(client: WolfClient, msg: ExtendedMessage, grp: ExtendedGroup){
        await client.Messaging.reply(msg, 'This is an example bot');
    
    }

    @Plugin('Hi')
    static async test(client: WolfClient, msg: ExtendedMessage, grp: ExtendedGroup){
        await client.Messaging.reply(msg, `Hi! ${msg.userProfile.nickname}`);
    }
    

    async login(){
        //All of this is pretty self explanatory.
        this.bot = new WolfClient();
        this.bot.On.LoginSuccess = (user) =>{
            console.log(user.nickname);
        }
        this.bot.On.LoginFailed = (resp) =>{
            console.log(resp);
        }

        this.bot.login("email", "password", DeviceType.Web);

        //This registers all plugins with a command key e.g '>test' would execute everything in the plugin 'test';
        //you can have as many plugins as you want.
        this.bot.registerPlugins('>');
    }

}
new Main().login();